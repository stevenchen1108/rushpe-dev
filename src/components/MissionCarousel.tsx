// components/MissionCarousel.tsx  (exports WidgetCarousel)
"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type WidgetItem = {
  id: number | string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image: StaticImageData | string;
};

export default function WidgetCarousel({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: WidgetItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card="true"]');
    const w = card ? card.offsetWidth : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * (w + getGap(el)), behavior: "smooth" });
  };

  const getGap = (el: HTMLElement) => {
    const gap = getComputedStyle(el).columnGap || getComputedStyle(el).gap;
    return parseFloat(gap || "0") || 0;
  };

  return (
    <section className="mx-auto max-w-[1680px] px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12 py-12">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      </header>

      <div className="relative">
        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 ring-1 ring-slate-200 shadow-sm p-3 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-800">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Scroller — gap matches section padding (edge==gutter) */}
        <div
          ref={scrollerRef}
          className={[
            "scroll-smooth snap-x snap-mandatory",
            "flex overflow-x-auto px-0 py-2",
            "gap-3 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          ].join(" ")}
          aria-roledescription="carousel"
        >
          {items.map((it) => (
            <article
              key={it.id}
              data-card="true"
              className={[
                "snap-start shrink-0",
                // widths tuned to show ~2 cards on lg, 1–1.5 on smaller
                "min-w-[92%] sm:min-w-[560px] lg:min-w-[640px]",
                // squared Apple-like card
                "rounded-none border border-slate-200 bg-white shadow-sm overflow-hidden",
              ].join(" ")}
            >
              <div className="px-5 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {it.eyebrow}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-1 text-slate-600">{it.body}</p>
              </div>

              <div className="relative mt-4 aspect-[16/10] w-full">
                <Image
                  src={it.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 94vw, (max-width: 1680px) 640px, 800px"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="px-5 py-5">
                <Link
                  href={it.href}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  Learn more <span aria-hidden></span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 ring-1 ring-slate-200 shadow-sm p-3 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-800">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
