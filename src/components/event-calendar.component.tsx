"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  startOfWeek,
  isSameDay,
  isSameMonth,
  set,
  format,
} from "date-fns";
import { useState, useEffect, useMemo, MouseEvent } from "react";
import "./event-calendar.component.css";
import { VscChromeClose } from "react-icons/vsc";
import { SiGooglecalendar } from "react-icons/si";
import FlyerPreview from "./event-flyer-preview.component";
import {
  CALENDAR_ID, CALENDAR_API_KEY, CALENDAR_SUBSCRIBE_URL,
  parseCalendarEvent, normalizeDescription, hasMeaningfulDescription,
  getEventFlyer,
  type EventItem, type GCalItem,
} from "@/lib/calendar";

/* ======================== Types ======================== */

type DayCell = {
  date: Date;
  selected: boolean;
  events: EventItem[];
};

/* ======================== Small icons ======================== */

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <path d="M12 22s7-5.33 7-12a7 7 0 1 0-14 0c0 6.67 7 12 7 12Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

/* ======================== Linkify helpers ======================== */

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Convert URLs/emails to anchors and preserve newlines
function linkify(text: string): string {
  const escaped = escapeHtml(text);

  // URLs (http/https or www.)
  const withUrls = escaped.replace(
    /\b(https?:\/\/[^\s<]+|\bwww\.[^\s<]+)\b/gi,
    (m) => {
      const href = m.startsWith("http") ? m : `https://${m}`;
      return `<a class="cal-link" href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
    },
  );

  // Emails
  const withEmails = withUrls.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    (m) => `<a class="cal-link" href="mailto:${m}">${m}</a>`,
  );

  // new lines → <br>
  return withEmails.replace(/\n/g, "<br/>");
}

/* ======================== Helpers ======================== */

function buildMonthGrid(forDate: Date): DayCell[] {
  const firstDOM = startOfMonth(forDate);
  const firstOfGrid = startOfWeek(firstDOM, { weekStartsOn: 0 });
  // Six weeks keep the calendar height steady when moving between months.
  const lastOfGrid = addDays(firstOfGrid, 41);
  return eachDayOfInterval({ start: firstOfGrid, end: lastOfGrid }).map(
    (d) => ({
      date: d,
      selected: false,
      events: [],
    }),
  );
}

function buildCalendarWithEvents(forDate: Date, events: EventItem[]): DayCell[] {
  const grid = buildMonthGrid(forDate);

  events.forEach((event) => {
    const eventDate = new Date(event.startISO);
    if (!isSameMonth(eventDate, forDate)) return;

    const cell = grid.find((day) => isSameDay(day.date, eventDate));
    cell?.events.push(event);
  });

  return grid;
}

/* ======================== Component ======================== */

export default function Events() {
  const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const today = useMemo(
    () =>
      set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    [],
  );

  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [eventSelected, setEventSelected] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [flyerPreview, setFlyerPreview] = useState<{ src: string; title: string } | null>(null);
  const selectedFlyerSrc = eventSelected ? getEventFlyer(eventSelected) : null;

  const calendarData = useMemo(
    () => buildCalendarWithEvents(visibleMonth, allEvents).map((cell) => ({
      ...cell,
      selected: selectedDate !== null && isSameDay(cell.date, selectedDate),
    })),
    [visibleMonth, allEvents, selectedDate],
  );
  const todayEvents = useMemo(
    () => allEvents.filter((event) => isSameDay(new Date(event.startISO), today)),
    [allEvents, today],
  );
  const startOfTomorrow = useMemo(() => {
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }, [today]);
  const todayEventsCount = todayEvents.length;
  const nextUpcomingEvent = useMemo(() => {
    const upcoming = allEvents
      .filter(
        (event) =>
          new Date(event.startISO).getTime() >= startOfTomorrow.getTime(),
      )
      .sort(
        (a, b) =>
          new Date(a.startISO).getTime() - new Date(b.startISO).getTime(),
      );
    return upcoming[0] ?? null;
  }, [allEvents, startOfTomorrow]);

  const renderEventCard = (event: EventItem, key: string) => {
    const start = new Date(event.startISO);
    const end = new Date(event.endISO);
    const flyerSrc = getEventFlyer(event);

    return (
      <article
        key={key}
        className={`detail-card${flyerSrc ? " detail-card--with-image" : ""}`}
        style={
          event.color ? { borderLeft: `8px solid ${event.color}` } : undefined
        }
      >
        {flyerSrc && (
          <button
            type="button"
            className="detail-flyer"
            onClick={() => setFlyerPreview({ src: flyerSrc, title: event.summary })}
            aria-label={`View full flyer for ${event.summary}`}
            aria-haspopup="dialog"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Flyer for ${event.summary}`}
              className="detail-img"
              src={flyerSrc}
              loading="lazy"
              decoding="async"
            />
          </button>
        )}

        <div className="detail-summary">
          <header className="detail-head">
            <h3 className="detail-title">{event.summary}</h3>
            <p className="detail-when">
              {format(start, "EEE, MMM d")} · {format(start, "h:mm a")} –{" "}
              {format(end, "h:mm a")}
            </p>
          </header>

          {event.location && (
            <div className="detail-meta">
              <div className="meta">
                <PinIcon className="meta-ic" />
                <span>{event.location}</span>
              </div>
            </div>
          )}
        </div>

        {hasMeaningfulDescription(event.description) && (
          <p
            className="detail-text"
            dangerouslySetInnerHTML={{
              __html: linkify(normalizeDescription(event.description)),
            }}
          />
        )}

        {event.rsvp && (
          <footer className="detail-footer">
            <a
              className="cal-rsvp"
              href={event.rsvp}
              target="_blank"
              rel="noreferrer"
            >
              RSVP
            </a>
          </footer>
        )}
      </article>
    );
  };

  // Fetch Google Calendar once
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&supportsAttachments=true&singleEvents=true&orderBy=startTime`,
          { headers: { "Content-Type": "application/json" } },
        );
        if (!res.ok) throw new Error("Unable to load calendar events");
        const data: { items?: GCalItem[] } = await res.json();

        const events: EventItem[] = [];

        for (const item of data.items ?? []) {
          const event = parseCalendarEvent(item);
          if (event) events.push(event);
        }

        setAllEvents(events);
      } catch (e) {
        console.error("Calendar fetch failed", e);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // modal ESC close
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const onDayClick = (cell: DayCell) => {
    setSelectedDate(cell.date);
    if (!cell.events.length) setModalOpen(false);
  };

  const changeMonth = (amount: number) => {
    setVisibleMonth((current) => addMonths(current, amount));
    setSelectedDate(null);
    setModalOpen(false);
  };

  const onEventClick = (ev: EventItem, e: MouseEvent) => {
    e.stopPropagation();
    setEventSelected(ev);
    setModalOpen(true);
  };

  return (
    <section className="cal-shell">
      {flyerPreview && (
        <FlyerPreview {...flyerPreview} onClose={() => setFlyerPreview(null)} />
      )}
      {/* Today's events */}
      <section
        className="day-detail-section day-detail-section--today"
        aria-labelledby="todays-events-title"
      >
        <header className="day-detail-header">
          <h1 id="todays-events-title" className="day-detail-title-main">
            Today&apos;s Events
          </h1>
          <p className="day-detail-subtitle">
            {format(today, "EEEE, MMMM d")} · {todayEventsCount} event
            {todayEventsCount === 1 ? "" : "s"} scheduled
          </p>
        </header>

        <div className="day-detail-list">
          {todayEvents.length ? (
            todayEvents.map((event) =>
              renderEventCard(
                event,
                `${event.startISO}-${event.summary}-today`,
              ),
            )
          ) : (
            <article className="detail-empty">
              <p>No events scheduled for today.</p>
            </article>
          )}
        </div>
      </section>

      <section id="calendar" className="cal-calendar-widget" aria-labelledby="calendar-month-title">
        <div className="cal-header">
          <div className="cal-month-controls">
            <button
              type="button"
              className="cal-month-nav"
              onClick={() => changeMonth(-1)}
              aria-label="Show previous month"
            >
              &#8592;
            </button>
            <h2 id="calendar-month-title" className="cal-month">
              {format(visibleMonth, "LLLL yyyy").toUpperCase()}
            </h2>
            <button
              type="button"
              className="cal-month-nav"
              onClick={() => changeMonth(1)}
              aria-label="Show next month"
            >
              &#8594;
            </button>
          </div>
          <div className="cal-header-actions">
            <a
              className="cal-subscribe"
              href={CALENDAR_SUBSCRIBE_URL}
            >
              <SiGooglecalendar className="h-[1.1rem] w-[1.1rem]" />
              <span className="sm:hidden">Subscribe</span>
              <span className="hidden sm:inline">Subscribe to our calendar</span>
            </a>
          </div>
        </div>

        {/* Week labels */}
        <div className="cal-weeklabels">
          {WEEK.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

      {/* Month grid */}
      <div key={format(visibleMonth, "yyyy-MM")} className="calendar-grid">
        {calendarData.map((cell) => {
          const isToday = cell.date.getTime() === today.getTime();
          const isDim = cell.date.getMonth() !== visibleMonth.getMonth() ||
            cell.date.getFullYear() !== visibleMonth.getFullYear();

          return (
            <div
              key={cell.date.toISOString()}
              className={`day-cell${cell.selected ? " day-cell--selected" : ""}${
                isToday ? " day-cell--today" : ""
              }${isDim ? " day-cell--dim" : ""}`}
              onClick={() => onDayClick(cell)}
            >
              <div className="day-number">{cell.date.getDate()}</div>
              <div className="event-stack">
                {cell.events.map((ev) => (
                  <div key={`${ev.startISO}-${ev.summary}`}>
                    <div
                      className="event-bar sm:hidden"
                      style={
                        ev.color ? { backgroundColor: ev.color } : undefined
                      }
                      aria-hidden
                    />
                    <button
                      className="event-pill hidden sm:block"
                      style={{
                        backgroundColor: ev.color,
                        color: "#000",
                      }}
                      onClick={(e) => onEventClick(ev, e)}
                      title={ev.summary}
                    >
                      {ev.summary}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </section>

      {/* Centered modal */}
      {modalOpen && eventSelected && (
        <div
          className="cal-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="cal-modal-card">
            <div className="cal-modal-head">
              <h3 className="cal-modal-title">{eventSelected.summary}</h3>
              <button
                className="cal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <VscChromeClose />
              </button>
            </div>

            <div className={`cal-modal-body${selectedFlyerSrc ? " cal-modal-body--with-image" : ""}`}>
              <div className="cal-modal-details">
                <div className="cal-modal-meta">
                  <div className="meta">
                    <CalendarIcon className="meta-ic" />
                    <span>
                      {format(new Date(eventSelected.startISO), "EEEE, MMM d")}
                    </span>
                  </div>
                  <div className="meta">
                    <ClockIcon className="meta-ic" />
                    <span>
                      {format(new Date(eventSelected.startISO), "h:mm a")} –{" "}
                      {format(new Date(eventSelected.endISO), "h:mm a")}
                    </span>
                  </div>
                  {eventSelected.location && (
                    <div className="meta">
                      <PinIcon className="meta-ic" />
                      <span>{eventSelected.location}</span>
                    </div>
                  )}
                </div>

                {hasMeaningfulDescription(eventSelected.description) && (
                  <p
                    className="cal-modal-desc"
                    dangerouslySetInnerHTML={{
                      __html: linkify(
                        normalizeDescription(eventSelected.description),
                      ),
                    }}
                  />
                )}

                {eventSelected.rsvp && (
                  <a
                    className="cal-rsvp"
                    href={eventSelected.rsvp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    RSVP
                  </a>
                )}
              </div>

              {selectedFlyerSrc && (
                <button
                  type="button"
                  className="cal-modal-flyer"
                  onClick={() => setFlyerPreview({ src: selectedFlyerSrc, title: eventSelected.summary })}
                  aria-label={`Expand flyer for ${eventSelected.summary}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`Flyer for ${eventSelected.summary}`}
                    className="cal-modal-img"
                    src={selectedFlyerSrc}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Next upcoming event */}
      <section
        className="day-detail-section"
        aria-labelledby="next-upcoming-title"
      >
        <header className="day-detail-header">
          <h2 id="next-upcoming-title" className="day-detail-title-main">
            Next Upcoming Event
          </h2>
          <p className="day-detail-subtitle">
            {nextUpcomingEvent
              ? `${format(new Date(nextUpcomingEvent.startISO), "EEEE, MMMM d")} · ${format(new Date(nextUpcomingEvent.startISO), "h:mm a")}`
              : "No future events are currently scheduled."}
          </p>
        </header>

        <div className="day-detail-list">
          {nextUpcomingEvent ? (
            renderEventCard(
              nextUpcomingEvent,
              `${nextUpcomingEvent.startISO}-${nextUpcomingEvent.summary}-next-upcoming`,
            )
          ) : (
            <article className="detail-empty">
              <p>Check back soon for new event announcements.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
