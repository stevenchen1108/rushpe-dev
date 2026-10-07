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
const {
  parseCalendarEvent, selectEventAnnouncements, fetchEventAnnouncements,
  getEventFlyer, safeEventUrl, selectUpcomingEvent, getEventDayLabel, getEventNoticeKey, fetchUpcomingEvent,
} = calendarModule.exports;

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

test("widget skips events that have ended and selects an ongoing event before a future event", () => {
  const now = new Date("2026-10-07T16:00:00Z");
  const events = [
    timed("future", "2026-10-07T18:00:00Z", "2026-10-07T19:00:00Z"),
    timed("ended", "2026-10-07T14:00:00Z", "2026-10-07T16:00:00Z"),
    timed("ongoing", "2026-10-07T15:00:00Z", "2026-10-07T17:00:00Z"),
  ];
  assert.equal(selectUpcomingEvent(events, now).id, "ongoing");
  assert.equal(selectUpcomingEvent([events[1]], now), null);
  assert.equal(selectUpcomingEvent([], now), null);
});

test("widget expires all-day events at chapter-local midnight using the exclusive end date", () => {
  const event = allDay("all-day", "2026-10-07", "2026-10-08");
  assert.equal(selectUpcomingEvent([event], new Date("2026-10-08T03:59:00Z")).id, "all-day");
  assert.equal(selectUpcomingEvent([event], new Date("2026-10-08T04:00:00Z")), null);
});

test("widget labels Today and Tomorrow in the chapter time zone even when the UTC day differs", () => {
  const now = new Date("2026-10-08T02:00:00Z");
  assert.equal(getEventDayLabel(timed("today", "2026-10-08T03:00:00Z", "2026-10-08T03:30:00Z"), now), "Today");
  assert.equal(getEventDayLabel(allDay("tomorrow", "2026-10-08", "2026-10-09"), now), "Tomorrow");
  assert.equal(getEventDayLabel(allDay("later", "2026-10-09", "2026-10-10"), now), null);
});

test("widget's Tomorrow label compares calendar dates across the spring DST change", () => {
  const now = new Date("2026-03-08T04:30:00Z");
  assert.equal(getEventDayLabel(timed("tomorrow", "2026-03-08T23:45:00-04:00", "2026-03-09T00:00:00-04:00"), now), "Tomorrow");
});

test("widget fetch paginates past invalid and cancelled items and requests only unended events", async (t) => {
  const urls = [];
  const future = new Date(Date.now() + 86400000).toISOString();
  const futureEnd = new Date(Date.now() + 90000000).toISOString();
  t.mock.method(globalThis, "fetch", async (url) => {
    const query = new URL(url).searchParams;
    urls.push(query);
    return Response.json(query.has("pageToken")
      ? { items: [{ id: "next", start: { dateTime: future }, end: { dateTime: futureEnd } }] }
      : { items: [{ id: "invalid" }, { id: "cancelled", status: "cancelled" }], nextPageToken: "next-page" });
  });
  assert.equal((await fetchUpcomingEvent()).id, "next");
  assert.equal(urls.length, 2);
  assert.equal(urls[0].get("singleEvents"), "true");
  assert.equal(urls[0].get("timeZone"), "America/New_York");
  assert.ok(Math.abs(Date.parse(urls[0].get("timeMin")) - Date.now()) < 1000);
  assert.equal(urls[1].get("pageToken"), "next-page");
});

test("widget fetch returns no event for an empty calendar", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ items: [] }));
  assert.equal(await fetchUpcomingEvent(), null);
});

test("widget fetch rejects failed requests so the component can hide and retry", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(fetchUpcomingEvent(), /Unable to load upcoming events/);
});

test("a dismissed future notice stays the same through Tomorrow, with a distinct event-day reminder", () => {
  const event = allDay("workshop", "2026-10-08", "2026-10-10");
  const upcoming = getEventNoticeKey(event, new Date("2026-10-06T16:00:00Z"));
  assert.equal(getEventNoticeKey(event, new Date("2026-10-08T03:59:00Z")), upcoming);
  const today = getEventNoticeKey(event, new Date("2026-10-08T04:00:00Z"));
  assert.notEqual(today, upcoming);
  assert.equal(getEventNoticeKey(event, new Date("2026-10-09T16:00:00Z")), today);
});

test("different events, recurring instances, and rescheduled events receive distinct notice keys", () => {
  const now = new Date("2026-10-07T16:00:00Z");
  const event = timed("workshop", "2026-10-08T18:00:00-04:00", "2026-10-08T19:00:00-04:00");
  const key = getEventNoticeKey(event, now);
  assert.notEqual(getEventNoticeKey({ ...event, id: "another-workshop" }, now), key);
  assert.notEqual(getEventNoticeKey({ ...event, startISO: "2026-10-15T18:00:00-04:00" }, now), key);
  assert.equal(getEventNoticeKey({ ...event, startISO: "2026-10-08T22:00:00Z" }, now), key);
});

test("event-day reminders follow the chapter's time zone across daylight-saving changes", () => {
  const event = allDay("workshop", "2026-11-01", "2026-11-02");
  const before = getEventNoticeKey(event, new Date("2026-11-01T03:59:00Z"));
  const after = getEventNoticeKey(event, new Date("2026-11-01T04:00:00Z"));
  assert.notEqual(after, before);
  assert.equal(getEventNoticeKey(event, new Date("2026-11-02T04:59:00Z")), after);
});
