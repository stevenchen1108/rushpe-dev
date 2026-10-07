const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Compile the pure calendar helper without introducing another test dependency.
const filename = path.resolve(__dirname, "../src/lib/calendar.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const calendarModule = new Module(filename, module);
calendarModule._compile(compiled, filename);
const { parseCalendarEvent, selectEventAnnouncements, fetchEventAnnouncements, getEventFlyer, safeEventUrl } = calendarModule.exports;

function timed(id, start, end, extra = {}) {
  return parseCalendarEvent({ id, summary: id, start: { dateTime: start }, end: { dateTime: end }, ...extra });
}

function allDay(id, start, end) {
  return parseCalendarEvent({ id, summary: id, start: { date: start }, end: { date: end } });
}

test("today follows Rutgers time even when the UTC date is tomorrow", () => {
  const events = [
    timed("later", "2026-10-09T18:00:00-04:00", "2026-10-09T19:00:00-04:00"),
    timed("today", "2026-10-07T18:00:00-04:00", "2026-10-07T19:00:00-04:00"),
    timed("past", "2026-10-06T18:00:00-04:00", "2026-10-06T19:00:00-04:00"),
    timed("next", "2026-10-08T18:00:00-04:00", "2026-10-08T19:00:00-04:00"),
  ];
  const result = selectEventAnnouncements(events, new Date("2026-10-08T02:00:00Z"));
  assert.deepEqual(result.today.map((event) => event.id), ["today"]);
  assert.equal(result.upcoming.id, "next");
});

test("all-day and overnight events include today, respecting exclusive end dates", () => {
  const events = [
    allDay("ended-at-midnight", "2026-10-06", "2026-10-07"),
    allDay("conference", "2026-10-06", "2026-10-09"),
    allDay("all-day", "2026-10-07", "2026-10-08"),
    timed("overnight", "2026-10-06T23:00:00-04:00", "2026-10-07T02:00:00-04:00"),
    timed("midnight-end", "2026-10-06T23:00:00-04:00", "2026-10-07T00:00:00-04:00"),
  ];
  assert.deepEqual(
    selectEventAnnouncements(events, new Date("2026-10-07T16:00:00Z")).today.map((event) => event.id),
    ["conference", "overnight", "all-day"],
  );
});

test("day classification handles both sides of the fall DST transition", () => {
  const events = [
    timed("first-1am", "2026-11-01T01:00:00-04:00", "2026-11-01T01:30:00-04:00"),
    timed("second-1am", "2026-11-01T01:00:00-05:00", "2026-11-01T01:30:00-05:00"),
    allDay("tomorrow", "2026-11-02", "2026-11-03"),
  ];
  const result = selectEventAnnouncements(events, new Date("2026-11-02T04:30:00Z"));
  assert.equal(result.today.length, 2);
  assert.equal(result.upcoming.id, "tomorrow");
});

test("an all-day event comes before a morning event on the next calendar day", () => {
  const events = [
    timed("morning", "2026-10-08T07:00:00-04:00", "2026-10-08T08:00:00-04:00"),
    allDay("all-day", "2026-10-08", "2026-10-09"),
  ];
  assert.equal(selectEventAnnouncements(events, new Date("2026-10-07T16:00:00Z")).upcoming.id, "all-day");
});

test("empty calendars and past-only calendars have no announcements", () => {
  const now = new Date("2026-10-07T16:00:00Z");
  assert.deepEqual(selectEventAnnouncements([], now), { today: [], upcoming: null });
  assert.deepEqual(selectEventAnnouncements([allDay("past", "2026-10-01", "2026-10-02")], now), { today: [], upcoming: null });
});

test("cancelled and malformed events are excluded", () => {
  assert.equal(timed("cancelled", "2026-10-07T16:00:00Z", "2026-10-07T17:00:00Z", { status: "cancelled" }), null);
  assert.equal(parseCalendarEvent({ summary: "missing dates" }), null);
  assert.equal(timed("invalid", "not a date", "not a date"), null);
});

test("flyers come from IMAGE tokens, HTML images, image links, or attachments", () => {
  const makeEvent = (extra) => timed("flyer", "2026-10-07T16:00:00Z", "2026-10-07T17:00:00Z", extra);
  const token = makeEvent({ description: "Join us! IMAGE: https://example.com/flyer.png RSVP: https://example.com/rsvp" });
  assert.equal(getEventFlyer(token), "https://example.com/flyer.png");
  assert.equal(token.description, "Join us!");
  assert.equal(token.rsvp, "https://example.com/rsvp");
  assert.equal(getEventFlyer(makeEvent({ description: '<img src="https://example.com/banner.png?a=1&amp;b=2">' })), "https://example.com/banner.png?a=1&b=2");
  assert.equal(getEventFlyer(makeEvent({ description: '<a href="https://example.com/banner.jpg?size=large">Flyer</a>' })), "https://example.com/banner.jpg?size=large");
  assert.equal(getEventFlyer(makeEvent({ attachments: [{ fileId: "drive-image" }] })), "https://lh3.googleusercontent.com/d/drive-image");
  assert.equal(getEventFlyer(makeEvent({})), undefined);
});

test("calendar links reject executable and malformed URLs", () => {
  assert.equal(safeEventUrl("javascript:alert(1)"), undefined);
  assert.equal(safeEventUrl("data:text/html,hello"), undefined);
  assert.equal(safeEventUrl("not-a-url"), undefined);
  assert.equal(safeEventUrl("/flyers/event.png"), "/flyers/event.png");
  assert.equal(safeEventUrl("/\\example.com/event.png"), undefined);
});

test("fetch follows pagination and expands recurring events until the next event is found", async (t) => {
  const now = new Date();
  const today = timed("today", now.toISOString(), new Date(now.getTime() + 60000).toISOString());
  const upcomingStart = new Date(now.getTime() + 3 * 86400000).toISOString();
  const urls = [];
  t.mock.method(globalThis, "fetch", async (url) => {
    const query = new URL(url).searchParams;
    urls.push(query);
    return Response.json(query.has("pageToken")
      ? { items: [{ id: "next", start: { dateTime: upcomingStart }, end: { dateTime: upcomingStart } }], nextPageToken: "unneeded-page" }
      : { items: [{ ...today, start: { dateTime: today.startISO }, end: { dateTime: today.endISO } }], nextPageToken: "page-two" });
  });
  const result = await fetchEventAnnouncements();
  assert.equal(result.today[0].id, "today");
  assert.equal(result.upcoming.id, "next");
  assert.equal(urls.length, 2);
  assert.equal(urls[0].get("singleEvents"), "true");
  assert.equal(urls[0].get("orderBy"), "startTime");
  assert.equal(urls[1].get("pageToken"), "page-two");
});

test("calendar failures reject instead of consuming the visitor's announcement", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(fetchEventAnnouncements(), /Unable to load calendar announcements/);
});
