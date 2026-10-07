"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, X } from "lucide-react";
import {
  CALENDAR_TIME_ZONE,
  fetchUpcomingEvent,
  getEventDayLabel,
  getEventFlyer,
  getEventNoticeKey,
  selectUpcomingEvent,
  type EventItem,
} from "@/lib/calendar";
import "./upcoming-event-widget.component.css";
import FlyerPreview from "./event-flyer-preview.component";

const DISMISSALS_STORAGE_KEY = "rushpe:upcoming-event-dismissals:v1";

function readDismissals(): Set<string> {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(DISMISSALS_STORAGE_KEY) ?? "[]");
    return new Set(Array.isArray(saved) ? saved.filter((key): key is string => typeof key === "string") : []);
  } catch {
    return new Set();
  }
}

export default function UpcomingEventWidget() {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [dismissedNotices, setDismissedNotices] = useState<Set<string>>(() => new Set());
  const [now, setNow] = useState(() => new Date());
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  const [posterPreview, setPosterPreview] = useState<{ src: string; title: string } | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setDismissedNotices(readDismissals());
    const syncDismissals = (storageEvent: StorageEvent) => {
      if (storageEvent.key === DISMISSALS_STORAGE_KEY || storageEvent.key === null) {
        setDismissedNotices(readDismissals());
      }
    };
    window.addEventListener("storage", syncDismissals);
    return () => window.removeEventListener("storage", syncDismissals);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let refreshTimer: number | undefined;
    const refresh = async () => {
      let next: EventItem | null = null;
      try {
        next = await fetchUpcomingEvent(controller.signal);
      } catch {
        // Leave browsing uninterrupted if the optional calendar feed fails.
      }
      if (controller.signal.aborted) return;
      const currentTime = new Date();
      setEvent(next);
      setNow(currentTime);
      // Refresh at the event's end so the next announcement can take its place.
      const delay = next && !next.allDay
        ? Math.min(300000, Math.max(1000, Date.parse(next.endISO) - currentTime.getTime() + 100))
        : 300000;
      refreshTimer = window.setTimeout(() => { void refresh(); }, delay);
    };
    void refresh();
    // Keep relative day labels current when a visitor leaves the page open.
    const clockTimer = window.setInterval(() => setNow(new Date()), 60000);
    return () => {
      controller.abort();
      window.clearTimeout(refreshTimer);
      window.clearInterval(clockTimer);
    };
  }, []);

  const upcoming = event ? selectUpcomingEvent([event], now) : null;
  const noticeKey = upcoming ? getEventNoticeKey(upcoming, now) : null;
  useEffect(() => {
    if (!noticeKey || dismissedNotices.has(noticeKey)) setPosterPreview(null);
  }, [noticeKey, dismissedNotices]);
  if (!upcoming || !noticeKey || dismissedNotices.has(noticeKey)) return null;
  const poster = getEventFlyer(upcoming);

  const dismissNotice = () => {
    // Merge with storage so dismissing in another tab does not lose its choices.
    const saved = Array.from(new Set([
      ...Array.from(readDismissals()),
      ...Array.from(dismissedNotices),
      noticeKey,
    ])).slice(-200);
    setDismissedNotices(new Set(saved));
    try {
      window.localStorage.setItem(DISMISSALS_STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Current-page dismissal still works when browser storage is unavailable.
    }
  };

  const start = new Date(upcoming.startISO);
  const relativeDay = getEventDayLabel(upcoming, now);
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: upcoming.allDay ? "UTC" : CALENDAR_TIME_ZONE,
    weekday: "short", month: "short", day: "numeric",
    ...(start.getUTCFullYear() !== now.getUTCFullYear() ? { year: "numeric" } : {}),
  }).format(start);
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIME_ZONE, hour: "numeric", minute: "2-digit",
  });
  const time = upcoming.allDay ? "All day" :
    `${timeFormat.format(start)} – ${timeFormat.format(new Date(upcoming.endISO))} ET`;

  return (
    <>
      <aside
        className="upcoming-event-widget"
        aria-labelledby="upcoming-event-widget-title"
        aria-live="polite"
        onFocusCapture={(focusEvent) => {
          const previous = focusEvent.relatedTarget;
          if (previous instanceof HTMLElement && previous.isConnected &&
            previous !== document.body && !previous.closest("dialog") &&
            !focusEvent.currentTarget.contains(previous)) {
            previousFocusRef.current = previous;
          }
        }}
      >
        <button
          type="button"
          className="upcoming-event-widget-close"
          aria-label="Dismiss upcoming event"
          onClick={() => {
            dismissNotice();
            if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus({ preventScroll: true });
          }}
        >
          <X aria-hidden="true" strokeWidth={1.5} />
        </button>
        <p className="upcoming-event-widget-eyebrow">Next at Rutgers SHPE</p>
        <div className="upcoming-event-widget-body">
          <div className="upcoming-event-widget-copy">
            <h2 id="upcoming-event-widget-title">{upcoming.summary}</h2>
            <div className="upcoming-event-widget-meta">
              <p>
                <CalendarDays aria-hidden="true" />
                <time dateTime={upcoming.startISO}>
                  {relativeDay && <strong>{relativeDay} · </strong>}{date}
                </time>
              </p>
              <p><Clock aria-hidden="true" /><span>{time}</span></p>
              <p><MapPin aria-hidden="true" /><span>{upcoming.location || "Location to be announced"}</span></p>
            </div>
            <Link href="/events#calendar" className="upcoming-event-widget-details" onClick={dismissNotice}>
              View Details <ArrowRight aria-hidden="true" />
              <span className="sr-only"> for {upcoming.summary}</span>
            </Link>
          </div>
          {poster && poster !== failedPoster && (
            <button
              type="button"
              className="upcoming-event-widget-poster"
              aria-label={`View poster for ${upcoming.summary}`}
              aria-haspopup="dialog"
              onClick={() => setPosterPreview({ src: poster, title: upcoming.summary })}
            >
              {/* Calendar posters may come from external hosts or Google Drive. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt={`Poster for ${upcoming.summary}`} onError={() => setFailedPoster(poster)} />
            </button>
          )}
        </div>
      </aside>
      {posterPreview && <FlyerPreview {...posterPreview} onClose={() => setPosterPreview(null)} />}
    </>
  );
}
