"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import {
  CALENDAR_SUBSCRIBE_URL,
  CALENDAR_TIME_ZONE,
  fetchEventAnnouncements,
  getEventFlyer,
  safeEventUrl,
  type EventAnnouncements,
  type EventItem,
} from "@/lib/calendar";
import "./event-announcement.component.css";
import FlyerPreview from "./event-flyer-preview.component";

// This flag lasts through client-side navigation and resets on a full refresh.
let seenInThisPage = false;

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/shpe_ru/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rutgers-university-shpe-686bba295", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/rutgers.she/", icon: FaFacebook },
  { label: "TikTok", href: "https://www.tiktok.com/@shpe_ru", icon: FaTiktok },
];

function AnnouncementEvent({ event, onPreview }: {
  event: EventItem;
  onPreview: (flyer: { src: string; title: string }) => void;
}) {
  const [flyerFailed, setFlyerFailed] = useState(false);
  const flyer = getEventFlyer(event);
  const rsvp = safeEventUrl(event.rsvp);
  // Date-only events must keep their calendar date in every visitor's time zone.
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: event.allDay ? "UTC" : CALENDAR_TIME_ZONE,
    weekday: "short", month: "short", day: "numeric",
  }).format(new Date(event.startISO));
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIME_ZONE, hour: "numeric", minute: "2-digit",
  });
  const time = event.allDay ? "All day" :
    `${timeFormat.format(new Date(event.startISO))} – ${timeFormat.format(new Date(event.endISO))} ET`;

  return (
    <article className="announcement-event">
      <div className="announcement-event-copy">
        <h4>{event.summary}</h4>
        <p className="announcement-event-meta">
          <CalendarDays aria-hidden="true" />
          <span>{date}</span>
        </p>
        <p className="announcement-event-meta">
          <Clock aria-hidden="true" />
          <span>{time}</span>
        </p>
        {event.location && (
          <p className="announcement-event-meta">
            <MapPin aria-hidden="true" />
            <span>{event.location}</span>
          </p>
        )}
        {event.description && <p className="announcement-event-description">{event.description}</p>}
        {rsvp && (
          <a className="announcement-rsvp" href={rsvp} target="_blank" rel="noopener noreferrer">
            RSVP <span className="sr-only">for {event.summary} (opens in a new tab)</span>
          </a>
        )}
      </div>
      {flyer && !flyerFailed && (
        <button
          type="button"
          className="announcement-flyer"
          onClick={() => onPreview({ src: flyer, title: event.summary })}
          aria-label={`View full flyer for ${event.summary}`}
          aria-haspopup="dialog"
        >
          {/* Calendar flyers can come from external hosts and Google Drive. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flyer} alt={`Flyer for ${event.summary}`} onError={() => setFlyerFailed(true)} />
        </button>
      )}
    </article>
  );
}

function AnnouncementDialog({ events, onClose }: {
  events: EventAnnouncements;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [flyerPreview, setFlyerPreview] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    // A native modal traps focus and makes the underlying page inert.
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    seenInThisPage = true;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="event-announcement"
        aria-labelledby="event-announcement-title"
        aria-describedby="event-announcement-description"
        onCancel={(event) => { event.preventDefault(); onClose(); }}
        onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="announcement-panel">
          <header className="announcement-header">
            <div>
              <p className="announcement-eyebrow">Rutgers SHPE</p>
              <h2 ref={titleRef} id="event-announcement-title" tabIndex={-1}>See you at Rutgers SHPE</h2>
              <p id="event-announcement-description">Here&apos;s what&apos;s happening with our familia.</p>
            </div>
            <button type="button" className="announcement-close" aria-label="Close event announcement" onClick={onClose}>
              <X aria-hidden="true" strokeWidth={1.5} />
            </button>
          </header>

          <div className="announcement-content">
            {events.today.length > 0 && (
              <section aria-labelledby="announcement-today-title">
                <h3 id="announcement-today-title" className="announcement-section-title">
                  <span className="announcement-today-dot" aria-hidden="true" />
                  Today&apos;s events
                  <span className="announcement-count">{events.today.length}</span>
                </h3>
                <div className="announcement-event-list">
                  {events.today.map((event) => (
                    <AnnouncementEvent key={event.id ?? `${event.startISO}-${event.summary}`} event={event} onPreview={setFlyerPreview} />
                  ))}
                </div>
              </section>
            )}
            {events.upcoming && (
              <section aria-labelledby="announcement-upcoming-title">
                <h3 id="announcement-upcoming-title" className="announcement-section-title">Coming up next</h3>
                <AnnouncementEvent event={events.upcoming} onPreview={setFlyerPreview} />
              </section>
            )}
            <Link href="/events#calendar" className="announcement-all-events" onClick={onClose}>View all events <span aria-hidden="true">→</span></Link>
          </div>

          <footer className="announcement-footer">
            <a className="announcement-subscribe" href={CALENDAR_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
              <CalendarDays aria-hidden="true" />
              Subscribe to our calendar
            </a>
            <p className="announcement-subscribe-note">Add our events to your calendar and stay in the loop.</p>
            <nav className="announcement-socials" aria-label="Follow Rutgers SHPE">
              <span>Follow our socials</span>
              <ul>
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Rutgers SHPE on ${social.label}`}>
                      <social.icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </footer>
        </div>
      </dialog>
      {flyerPreview && <FlyerPreview {...flyerPreview} onClose={() => setFlyerPreview(null)} />}
    </>
  );
}

export default function EventAnnouncement() {
  const [events, setEvents] = useState<EventAnnouncements | null>(null);

  useEffect(() => {
    if (seenInThisPage) return;
    const controller = new AbortController();
    void fetchEventAnnouncements(controller.signal).then((announcements) => {
      if (controller.signal.aborted || seenInThisPage) return;
      if (announcements.today.length || announcements.upcoming) setEvents(announcements);
    }).catch(() => {
      // An optional announcement must never prevent browsing the website.
      // Leave the seen flag unset so a future visit can retry a failed request.
    });
    return () => controller.abort();
  }, []);

  return events ? <AnnouncementDialog events={events} onClose={() => setEvents(null)} /> : null;
}
