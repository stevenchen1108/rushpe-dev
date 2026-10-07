export const CALENDAR_ID =
  "c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com";
export const CALENDAR_SUBSCRIBE_URL =
  `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(CALENDAR_ID)}`;
export const CALENDAR_TIME_ZONE = "America/New_York";
// Use the same public-calendar configuration as the existing events page.
export const CALENDAR_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_CAL_API_KEY ??
  "AIzaSyBCIOf5yqU8ThEm-h95QvynRXrM4H7wnUs";

type GCalDate = { date?: string; dateTime?: string };
type GCalAttachment = { fileId: string };

export type GCalItem = {
  id?: string;
  status?: string;
  summary?: string;
  description?: string;
  start: GCalDate;
  end: GCalDate;
  attachments?: GCalAttachment[];
  location?: string;
};

export type EventItem = {
  id?: string;
  allDay?: boolean;
  summary: string;
  description: string;
  startISO: string;
  endISO: string;
  attachments: string[];
  rsvp?: string;
  color?: string;
  image?: string;
  text?: string;
  location?: string;
};

const PASTELS = [
  "#F8D7DA", // Blush
  "#FFE8CC", // Peach
  "#DDEBFF", // Blue
  "#DFF5E1", // Mint
  "#FFF7CC", // Yellow
  "#EDE2FA", // Lavender
] as const;

function pickPastelKey(stableKey: string): string {
  let hash = 5381;
  for (let i = 0; i < stableKey.length; i++) {
    hash = (Math.imul(hash, 33) + stableKey.charCodeAt(i)) | 0;
  }
  const idx = (hash >>> 0) % PASTELS.length;
  return PASTELS[idx];
}

/* ======================== Helpers ======================== */

function toISO(d: GCalDate): string {
  if (d.dateTime) return d.dateTime;
  if (d.date) return `${d.date}T12:00:00Z`;
  return new Date().toISOString();
}

function extractTokens(desc: string): {
  clean: string;
  tokens: Partial<EventItem>;
} {
  let working = (desc ?? "").replace(/<br\s*\/?>/gi, "\n");

  const tokens: Partial<EventItem> = {};

  const imageTagRx = /<img[^>]*src=["']([^"']+)["'][^>]*>/i;
  const imageTagMatch = working.match(imageTagRx);
  if (imageTagMatch) {
    tokens.image = decodeHtmlEntities(imageTagMatch[1]);
    working = working.replace(imageTagRx, "");
  }

  const imageAnchorRx =
    /<a[^>]*href=["']([^"']+\.(?:png|jpe?g|webp|gif)(?:\?[^"']*)?)["'][^>]*>.*?<\/a>/i;
  const imgAnchorMatch = working.match(imageAnchorRx);
  if (imgAnchorMatch && !tokens.image) {
    tokens.image = decodeHtmlEntities(imgAnchorMatch[1]);
    working = working.replace(imageAnchorRx, "");
  }

  working = working.replace(/<a[^>]*href="([^"]+)"[^>]*>.*?<\/a>/gi, "$1");

  (["RSVP", "COLOR", "IMAGE", "TEXT", "ID"] as const).forEach((opt) => {
    const rx = new RegExp(`\\s*${opt}:\\s*([^\\s]+)`, "g");
    const m = rx.exec(working);
    if (m) {
      const v = m[1];
      if (opt === "RSVP") tokens.rsvp = decodeHtmlEntities(v);
      if (opt === "IMAGE" && !tokens.image) tokens.image = decodeHtmlEntities(v);
      if (opt === "TEXT") tokens.text = v;
    }
    working = working.replace(rx, "");
  });

  return { clean: normalizeDescription(working), tokens };
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;|&#160;|&#xa0;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

export function normalizeDescription(value: string): string {
  const withoutTags = value.replace(/<[^>]*>/g, " ");
  const decoded = decodeHtmlEntities(withoutTags);
  const withoutInvisible = decoded.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const withoutControl = withoutInvisible.replace(
    /[\u0000-\u001F\u007F]/g,
    " ",
  );
  const cleaned = withoutControl.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const normalized = cleaned.toLowerCase();
  if (
    normalized === "0" ||
    normalized === "null" ||
    normalized === "undefined" ||
    normalized === "n/a" ||
    normalized === "na"
  ) {
    return "";
  }
  return cleaned;
}

export function hasMeaningfulDescription(value: string): boolean {
  return normalizeDescription(value).length > 0;
}

export function parseCalendarEvent(item: GCalItem): EventItem | null {
  if (item.status === "cancelled" || !item.start || !item.end) return null;
  if (!(item.start.dateTime || item.start.date) || !(item.end.dateTime || item.end.date)) return null;
  const startISO = toISO(item.start);
  const endISO = toISO(item.end);
  if (!Number.isFinite(Date.parse(startISO)) || !Number.isFinite(Date.parse(endISO))) return null;
  const { clean, tokens } = extractTokens(item.description ?? "");
  return {
    id: item.id,
    allDay: Boolean(item.start.date && !item.start.dateTime),
    summary: item.summary ?? "Untitled Event",
    description: clean,
    startISO,
    endISO,
    attachments: (item.attachments ?? []).map((attachment) => attachment.fileId).filter(Boolean),
    location: item.location,
    ...tokens,
    // Always use readable pastels, ignoring legacy COLOR overrides. A stable
    // event key varies the colors without reshuffling them on refresh.
    color: pickPastelKey(`${item.id ?? item.summary ?? ""}|${startISO}`),
  };
}

export function safeEventUrl(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.href;
    }
  } catch { /* Ignore malformed calendar links. */ }
  return undefined;
}

export function getEventFlyer(event: EventItem): string | undefined {
  return safeEventUrl(event.image) ?? (event.attachments[0]
    ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(event.attachments[0])}`
    : undefined);
}

// ISO day keys compare correctly and keep "today" in the chapter's time zone.
function dayKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
}

export type EventAnnouncements = { today: EventItem[]; upcoming: EventItem | null };

function eventDayKey(event: EventItem): string {
  return event.allDay ? event.startISO.slice(0, 10) : dayKey(new Date(event.startISO));
}

export function selectEventAnnouncements(events: EventItem[], now = new Date()): EventAnnouncements {
  const todayKey = dayKey(now);
  const sorted = [...events].sort((a, b) => (
    eventDayKey(a).localeCompare(eventDayKey(b)) ||
    Number(Boolean(b.allDay)) - Number(Boolean(a.allDay)) ||
    Date.parse(a.startISO) - Date.parse(b.startISO)
  ));
  const today = sorted.filter((event) => {
    const start = eventDayKey(event);
    // Google Calendar's end date is exclusive for all-day events.
    const end = event.allDay
      ? new Date(Date.parse(`${event.endISO.slice(0, 10)}T12:00:00Z`) - 86400000).toISOString().slice(0, 10)
      : dayKey(new Date(Math.max(Date.parse(event.startISO), Date.parse(event.endISO) - 1)));
    return start <= todayKey && end >= todayKey;
  });
  const upcoming = sorted.find((event) => eventDayKey(event) > todayKey) ?? null;
  return { today, upcoming };
}

export async function fetchEventAnnouncements(signal?: AbortSignal): Promise<EventAnnouncements> {
  const now = new Date();
  const query = new URLSearchParams({
    key: CALENDAR_API_KEY,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "100",
    timeZone: CALENDAR_TIME_ZONE,
    // Two days cover the whole chapter-local day, including DST transitions.
    timeMin: new Date(now.getTime() - 2 * 86400000).toISOString(),
  });
  const events: EventItem[] = [];
  let pageToken: string | undefined;
  do {
    if (pageToken) query.set("pageToken", pageToken);
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${query}`,
      { signal },
    );
    if (!response.ok) throw new Error("Unable to load calendar announcements");
    const data: { items?: GCalItem[]; nextPageToken?: string } = await response.json();
    for (const item of data.items ?? []) {
      const event = parseCalendarEvent(item);
      if (event) events.push(event);
    }
    const announcements = selectEventAnnouncements(events, now);
    // Results are ordered by start time; stop once the next event is found.
    if (announcements.upcoming) return announcements;
    pageToken = data.nextPageToken;
  } while (pageToken);
  return selectEventAnnouncements(events, now);
}

export function selectUpcomingEvent(events: EventItem[], now = new Date()): EventItem | null {
  const today = dayKey(now);
  return [...events]
    .filter((event) => event.allDay
      ? event.endISO.slice(0, 10) > today
      : Date.parse(event.endISO) > now.getTime())
    .sort((a, b) => (
      eventDayKey(a).localeCompare(eventDayKey(b)) ||
      Number(Boolean(b.allDay)) - Number(Boolean(a.allDay)) ||
      Date.parse(a.startISO) - Date.parse(b.startISO)
    ))[0] ?? null;
}

export function getEventDayLabel(event: EventItem, now = new Date()): "Today" | "Tomorrow" | null {
  const today = dayKey(now);
  const eventDay = eventDayKey(event);
  if (eventDay === today) return "Today";
  // Compare calendar dates rather than 24-hour intervals across DST changes.
  const tomorrow = new Date(`${today}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return eventDay === tomorrow.toISOString().slice(0, 10) ? "Tomorrow" : null;
}

export function getEventNoticeKey(event: EventItem, now = new Date()): string {
  const start = event.allDay ? event.startISO.slice(0, 10) : new Date(event.startISO).toISOString();
  // Keep one dismissal before the event and another for its event-day reminder.
  // Dates distinguish recurring instances and allow rescheduled events to return.
  const phase = eventDayKey(event) <= dayKey(now) ? "today" : "upcoming";
  return JSON.stringify([event.id ?? event.summary, start, phase]);
}

export async function fetchUpcomingEvent(signal?: AbortSignal): Promise<EventItem | null> {
  const now = new Date();
  const query = new URLSearchParams({
    key: CALENDAR_API_KEY,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "100",
    timeZone: CALENDAR_TIME_ZONE,
    timeMin: now.toISOString(),
  });
  let pageToken: string | undefined;
  do {
    if (pageToken) query.set("pageToken", pageToken);
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${query}`,
      { signal },
    );
    if (!response.ok) throw new Error("Unable to load upcoming events");
    const data: { items?: GCalItem[]; nextPageToken?: string } = await response.json();
    const events = (data.items ?? []).map(parseCalendarEvent)
      .filter((event): event is EventItem => event !== null);
    const event = selectUpcomingEvent(events, now);
    if (event) return event;
    pageToken = data.nextPageToken;
  } while (pageToken);
  return null;
}
