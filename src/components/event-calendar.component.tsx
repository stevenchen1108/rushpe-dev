'use client';

import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  set,
  format,
} from 'date-fns';
import { useState, useEffect, useMemo, MouseEvent } from 'react';
import './event-calendar.component.css';
import { VscChromeClose } from 'react-icons/vsc';
import { SiGooglecalendar } from 'react-icons/si';

/* ======================== Types ======================== */

type GCalDate = { date?: string; dateTime?: string };
type GCalAttachment = { fileId: string };

type GCalItem = {
  summary?: string;
  description?: string;
  start: GCalDate;
  end: GCalDate;
  attachments?: GCalAttachment[];
  location?: string;
};

type EventItem = {
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

type DayCell = {
  date: Date;
  selected: boolean;
  events: EventItem[];
};

/* ======================== Small icons ======================== */

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" {...props}>
      <path d="M12 22s7-5.33 7-12a7 7 0 1 0-14 0c0 6.67 7 12 7 12Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

/* ======================== Linkify helpers ======================== */

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Convert URLs/emails to anchors and preserve newlines
function linkify(text: string): string {
  const escaped = escapeHtml(text);

  // URLs (http/https or www.)
  const withUrls = escaped.replace(
    /\b(https?:\/\/[^\s<]+|\bwww\.[^\s<]+)\b/gi,
    (m) => {
      const href = m.startsWith('http') ? m : `https://${m}`;
      return `<a class="cal-link" href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
    }
  );

  // Emails
  const withEmails = withUrls.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    (m) => `<a class="cal-link" href="mailto:${m}">${m}</a>`
  );

  // new lines → <br>
  return withEmails.replace(/\n/g, '<br/>');
}

/* ======================== Pastel color helper ======================== */

const PASTELS = ['#F8D7DA', '#FFE8CC', '#DDEBFF', '#DFF5E1', '#FFF7CC'] as const;

function pickPastelKey(stableKey: string): string {
  let hash = 5381;
  for (let i = 0; i < stableKey.length; i++) {
    hash = ((hash << 5) + hash) + stableKey.charCodeAt(i);
  }
  const idx = Math.abs(hash) % PASTELS.length;
  return PASTELS[idx];
}

/* ======================== Helpers ======================== */

function toISO(d: GCalDate): string {
  if (d.dateTime) return d.dateTime;
  if (d.date) return `${d.date}T12:00:00Z`;
  return new Date().toISOString();
}

function extractTokens(desc: string): { clean: string; tokens: Partial<EventItem> } {
  let working = (desc ?? '').replace(/<br\s*\/?>/gi, '\n');

  const tokens: Partial<EventItem> = {};

  const imageAnchorRx = /<a[^>]*href="([^"]+\.(?:png|jpe?g|webp|gif))"[^>]*>.*?<\/a>/i;
  const imgAnchorMatch = working.match(imageAnchorRx);
  if (imgAnchorMatch && !tokens.image) {
    tokens.image = imgAnchorMatch[1];
    working = working.replace(imageAnchorRx, '');
  }

  working = working.replace(/<a[^>]*href="([^"]+)"[^>]*>.*?<\/a>/gi, '$1');

  (['RSVP', 'COLOR', 'IMAGE', 'TEXT', 'ID'] as const).forEach((opt) => {
    const rx = new RegExp(`\\s*${opt}:\\s*([^\\s]+)`, 'g');
    const m = rx.exec(working);
    if (m) {
      const v = m[1];
      if (opt === 'RSVP') tokens.rsvp = v;
      if (opt === 'COLOR') tokens.color = v;
      if (opt === 'IMAGE' && !tokens.image) tokens.image = v;
      if (opt === 'TEXT') tokens.text = v;
    }
    working = working.replace(rx, '');
  });

  return { clean: working.trim(), tokens };
}

function buildMonthGrid(forDate: Date): DayCell[] {
  const firstDOM = startOfMonth(forDate);
  const firstOfGrid = startOfWeek(firstDOM, { weekStartsOn: 0 });
  const lastOfGrid = endOfWeek(endOfMonth(forDate), { weekStartsOn: 0 });
  return eachDayOfInterval({ start: firstOfGrid, end: lastOfGrid }).map((d) => ({
    date: d,
    selected: false,
    events: [],
  }));
}

/* ======================== Component ======================== */

export default function Events() {
  const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = useMemo(
    () => set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    [],
  );

  const initialGrid = useMemo(() => buildMonthGrid(today), [today]);
  const firstDOM = startOfMonth(today);
  const dateIndexOffset = firstDOM.getDay() - 1;

  const [calendarData, setCalendar] = useState<DayCell[]>(initialGrid);
  const [daySelected, setDaySelected] = useState<DayCell>(
    initialGrid[today.getDate() + dateIndexOffset],
  );
  const [eventSelected, setEventSelected] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // QUICK accessor for today's cell from current state
  const todayCell = useMemo(
    () => calendarData.find(c => c.date.getTime() === today.getTime())
         ?? initialGrid[today.getDate() + dateIndexOffset],
    [calendarData, today, initialGrid, dateIndexOffset]
  );

  useEffect(() => {
    setCalendar((prev) =>
      prev.map((c) => ({ ...c, selected: c.date.getTime() === daySelected.date.getTime() })),
    );
  }, [daySelected]);

  // Fetch Google Calendar once
  useEffect(() => {
    const fetchEvents = async () => {
      const calendarId =
        'c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com';
      const apiKey =
        process.env.NEXT_PUBLIC_GOOGLE_CAL_API_KEY ??
        'AIzaSyBCIOf5yqU8ThEm-h95QvynRXrM4H7wnUs';

      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&supportsAttachments=true&singleEvents=true&orderBy=startTime`,
          { headers: { 'Content-Type': 'application/json' } },
        );
        const data: { items?: GCalItem[] } = await res.json();

        const next = buildMonthGrid(today);

        (data.items ?? []).forEach((item) => {
          const startISO = toISO(item.start);
          const endISO = toISO(item.end);
          const startDate = new Date(startISO);

          if (
            startDate.getMonth() === today.getMonth() &&
            startDate.getFullYear() === today.getFullYear()
          ) {
            const { clean, tokens } = extractTokens(item.description ?? '');
            const stableKey = `${item.summary ?? ''}|${startISO}`;
            const pastel = tokens.color ?? pickPastelKey(stableKey);

            const event: EventItem = {
              summary: item.summary ?? 'Untitled Event',
              description: clean,
              startISO,
              endISO,
              attachments: Array.isArray(item.attachments)
                ? item.attachments.map((a) => a.fileId)
                : [],
              location: item.location,
              color: pastel,
              rsvp: tokens.rsvp,
              image: tokens.image,
              text: tokens.text,
            };

            const idx = startDate.getDate() + dateIndexOffset;
            if (next[idx]) next[idx].events.push(event);
          }
        });

        setCalendar(next);
        // also select today automatically so under-grid list is filled
        const todayIdx = today.getDate() + dateIndexOffset;
        setDaySelected(next[todayIdx]);
      } catch (e) {
        console.error('Calendar fetch failed', e);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // modal ESC close
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  const onDayClick = (cell: DayCell) => {
    setDaySelected(cell);
    if (!cell.events.length) setModalOpen(false);
  };

  const onEventClick = (ev: EventItem, e: MouseEvent) => {
    e.stopPropagation();
    setEventSelected(ev);
    setModalOpen(true);
  };

  return (
    <section className="cal-shell">
      {/* Header */}
      <div className="cal-header">
        <h1 className="cal-month">{format(today, 'LLLL').toUpperCase()}</h1>
        <a
          className="cal-subscribe"
          href="https://calendar.google.com/calendar/u/0/r?cid=c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com"
        >
          <SiGooglecalendar className="h-[1.1rem] w-[1.1rem]" />
          <span className="sm:hidden">Subscribe</span>
          <span className="hidden sm:inline">Subscribe to our calendar</span>
        </a>
      </div>

      {/* ======= Today panel (auto-filled) ======= */}
      <div className="today-panel">
        <h2 className="today-title">
          Today — {format(today, 'EEEE, MMM d')}
        </h2>

        {todayCell?.events?.length ? (
          <ul className="today-list">
            {todayCell.events.map((ev) => (
              <li key={`${ev.startISO}-${ev.summary}-today`} className="today-item">
                <span className="today-time">
                  {format(new Date(ev.startISO), 'h:mm a')}
                </span>
                <button
                  className="today-pill"
                  style={{ backgroundColor: ev.color, color: '#000' }}
                  onClick={(e) => onEventClick(ev, e)}
                >
                  {ev.summary}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="today-empty">No events today.</p>
        )}
      </div>

      {/* Week labels */}
      <div className="cal-weeklabels">
        {WEEK.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

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
              <button className="cal-close" onClick={() => setModalOpen(false)} aria-label="Close">
                <VscChromeClose />
              </button>
            </div>

            <div className="cal-modal-meta">
              <div className="meta">
                <CalendarIcon className="meta-ic" />
                <span>{format(new Date(eventSelected.startISO), 'EEEE, MMM d')}</span>
              </div>
              <div className="meta">
                <ClockIcon className="meta-ic" />
                <span>
                  {format(new Date(eventSelected.startISO), 'h:mm a')} –{' '}
                  {format(new Date(eventSelected.endISO), 'h:mm a')}
                </span>
              </div>
              {eventSelected.location && (
                <div className="meta">
                  <PinIcon className="meta-ic" />
                  <span>{eventSelected.location}</span>
                </div>
              )}
            </div>

            {eventSelected.description && (
              <p
                className="cal-modal-desc"
                dangerouslySetInnerHTML={{ __html: linkify(eventSelected.description) }}
              />
            )}

            {(eventSelected.image || eventSelected.attachments.length) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt="event"
                className="cal-modal-img"
                src={
                  eventSelected.image
                    ? eventSelected.image
                    : 'https://lh3.googleusercontent.com/d/' + eventSelected.attachments[0]
                }
              />
            )}

            {eventSelected.rsvp && (
              <a className="cal-rsvp" href={eventSelected.rsvp} target="_blank" rel="noreferrer">
                RSVP
              </a>
            )}
          </div>
        </div>
      )}

      {/* Month grid */}
      <div className="calendar-grid">
        {calendarData.map((cell) => {
          const isToday = cell.date.getTime() === today.getTime();
          const isDim = cell.date.getMonth() !== today.getMonth();

          return (
            <div
              key={cell.date.toISOString()}
              className={`day-cell${cell.selected ? ' day-cell--selected' : ''}${
                isToday ? ' day-cell--today' : ''
              }${isDim ? ' day-cell--dim' : ''}`}
              onClick={() => onDayClick(cell)}
            >
              <div className="day-number">{cell.date.getDate()}</div>
              <div className="event-stack">
                {cell.events.map((ev) => (
                  <div key={`${ev.startISO}-${ev.summary}`}>
                    <div
                      className="event-bar sm:hidden"
                      style={ev.color ? { backgroundColor: ev.color } : undefined}
                      aria-hidden
                    />
                    <button
                      className="event-pill hidden sm:block"
                      style={{
                        backgroundColor: ev.color,
                        color: '#000',
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

      {/* Under-grid day details */}
      <h2 className={`day-detail-date${daySelected.events.length ? '' : ' hidden'}`}>
        {format(daySelected.date, 'EEEE, MMM do')}
      </h2>

      <div className="day-detail-list">
        {daySelected.events.map((ev) => {
          const start = new Date(ev.startISO);
          const end = new Date(ev.endISO);
          return (
            <article
              key={`${ev.startISO}-${ev.summary}-detail`}
              className="detail-card"
              style={ev.color ? { borderLeft: `8px solid ${ev.color}` } : undefined}
            >
              <header className="detail-head">
                <h3 className="detail-title">{ev.summary}</h3>
                <p className="detail-when">
                  {format(start, 'EEE, MMM d')} · {format(start, 'h:mm a')} – {format(end, 'h:mm a')}
                </p>
              </header>

              <div className="detail-meta">
                {ev.location && (
                  <div className="meta">
                    <PinIcon className="meta-ic" />
                    <span>{ev.location}</span>
                  </div>
                )}
              </div>

              {ev.description && (
                <p
                  className="detail-text"
                  dangerouslySetInnerHTML={{ __html: linkify(ev.description) }}
                />
              )}

              {(ev.image || ev.attachments.length) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="event"
                  className="detail-img"
                  src={ev.image ? ev.image : 'https://lh3.googleusercontent.com/d/' + ev.attachments[0]}
                />
              )}

              {ev.rsvp && (
                <footer className="detail-footer">
                  <a className="cal-rsvp" href={ev.rsvp} target="_blank" rel="noreferrer">
                    RSVP
                  </a>
                </footer>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
