// src/components/WidgetCarousel.tsx
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

  /** Utilities */
  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 639.98px)").matches;

  const getCards = () =>
    (trackRef.current
      ? Array.from(trackRef.current.querySelectorAll<HTMLElement>("[data-card]"))
      : []) as HTMLElement[];

  const padLeft = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const pl = parseFloat(getComputedStyle(el).paddingLeft || "0");
    return Number.isFinite(pl) ? pl : 0;
  };

  const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(n, hi));

  /** Mode-aware active index:
      - Mobile: closest to viewport center
      - Desktop: card whose LEFT edge is closest to scrollLeft (start-aligned) */
  const getActiveIndex = () => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || !cards.length) return 0;

    const pl = padLeft();
    if (isMobile()) {
      const vc = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const left = cards[i].offsetLeft - pl;
        const center = left + cards[i].offsetWidth / 2;
        const d = Math.abs(center - vc);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    } else {
      // Desktop: compare to scrollLeft (start edge)
      const sl = el.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const left = cards[i].offsetLeft - pl;
        const d = Math.abs(left - sl);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    }
  };

  /** Scroll to index:
      - Mobile: center the card
      - Desktop: align to start */
  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || !cards.length) return;

    const c = cards[idx];
    const pl = padLeft();

    let targetLeft: number;
    if (isMobile()) {
      targetLeft = c.offsetLeft - pl - (el.clientWidth - c.offsetWidth) / 2; // center
    } else {
      targetLeft = c.offsetLeft - pl; // start align
    }
    targetLeft = clamp(targetLeft, 0, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const step = (dir: "prev" | "next") => {
    const cards = getCards();
    if (!cards.length) return;
    const i = getActiveIndex();
    const next = clamp(i + (dir === "next" ? 1 : -1), 0, cards.length - 1);
    scrollToIndex(next);
  };

  /** Edge state based on MODE-AWARE active index */
  const updateEdges = useCallback(() => {
    const cards = getCards();
    if (!cards.length) {
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    const i = getActiveIndex();
    setAtStart(i === 0);
    setAtEnd(i === cards.length - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Initial placement: first card
    const init = () => scrollToIndex(0);
    requestAnimationFrame(init);
    // @ts-ignore
    document?.fonts?.ready?.then(init).catch(() => {});

    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      // After layout/orientation changes, keep the nearest card properly placed
      const i = getActiveIndex();
      scrollToIndex(i);
      updateEdges();
    });
    ro.observe(el);

    updateEdges();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateEdges]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step("next");
    if (e.key === "ArrowLeft") step("prev");
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
        {!atStart && (
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#eeeeee] to-transparent" />
        )}
        {!atEnd && (
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#eeeeee] to-transparent" />
        )}

        {/* Track: snap-center on mobile; snap-start on sm+ */}
        <div
          ref={trackRef}
          className="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-2 px-5 sm:px-0
                     snap-x snap-mandatory snap-center sm:snap-start"
          tabIndex={0}
          onKeyDown={onKey}
          aria-roledescription="carousel"
        >
          {items.map((it) => (
            <div
              key={it.id}
              data-card
              className="snap-center sm:snap-start basis-[88%] sm:basis-[64%] lg:basis-[52%] xl:basis-[46%] shrink-0"
            >
              <WidgetCard item={it} />
            </div>
          ))}
        </div>

        {/* Arrows: hidden on first/last via index; mobile hangs into gutter */}
        {!atStart && (
          <button
            type="button"
            aria-label="Previous"
            onClick={() => step("prev")}
            className="absolute -left-3 sm:left-2 top-1/2 -translate-y-1/2 inline-grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full
                       bg-white/70 text-slate-700 ring-1 ring-slate-200/70 backdrop-blur
                       shadow-[0_6px_20px_rgba(2,6,23,.15)] hover:bg-white/85"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 sm:w-[20px] sm:h-[20px]">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {!atEnd && (
          <button
            type="button"
            aria-label="Next"
            onClick={() => step("next")}
            className="absolute -right-3 sm:right-2 top-1/2 -translate-y-1/2 inline-grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full
                       bg-white/70 text-slate-700 ring-1 ring-slate-200/70 backdrop-blur
                       shadow-[0_6px_20px_rgba(2,6,23,.15)] hover:bg-white/85"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 sm:w-[20px] sm:h-[20px]">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
