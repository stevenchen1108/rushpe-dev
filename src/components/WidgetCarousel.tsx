"use client";

import { useRef, useEffect, useState, useCallback, KeyboardEvent } from "react";
import WidgetCard, { WidgetCardProps } from "./WidgetCard";

type Props = {
  title?: string;
  subtitle?: string;
  items: WidgetCardProps[];
};

export default function WidgetCarousel({ title, subtitle, items }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    const maxLeft = scrollWidth - clientWidth - 1;
    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft >= maxLeft);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateEdges]);

  const scrollByViewport = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollByViewport("next");
    if (e.key === "ArrowLeft") scrollByViewport("prev");
  };

  return (
    <section className="relative mx-auto max-w-7xl px-0 sm:px-6 py-14">
      {(title || subtitle) && (
        <header className="mb-8 max-w-2xl px-5 sm:px-0">
          {title && <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </header>
      )}

      <div className="relative overflow-hidden">
        {/* Edge fades; color matches page section bg (#eeeeee) */}
        {!atStart && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#eeeeee] to-transparent" />
        )}
        {!atEnd && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#eeeeee] to-transparent" />
        )}

        {/* Track */}
        <div
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 px-5 sm:px-0"
          tabIndex={0}
          onKeyDown={onKey}
          aria-roledescription="carousel"
        >
          {items.map((it) => (
            <div
              key={it.id}
              className="snap-start basis-[88%] sm:basis-[64%] lg:basis-[52%] xl:basis-[46%] shrink-0"
            >
              <WidgetCard item={it} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {!atStart && (
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByViewport("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-grid h-14 w-14 place-items-center rounded-full
                       bg-white/65 text-slate-700 ring-1 ring-slate-200/70 backdrop-blur
                       shadow-[0_6px_20px_rgba(2,6,23,.15)] hover:bg-white/80"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {!atEnd && (
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByViewport("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-grid h-14 w-14 place-items-center rounded-full
                       bg-white/65 text-slate-700 ring-1 ring-slate-200/70 backdrop-blur
                       shadow-[0_6px_20px_rgba(2,6,23,.15)] hover:bg-white/80"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
