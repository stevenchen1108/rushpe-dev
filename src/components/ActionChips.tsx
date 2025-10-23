// components/ActionChips.tsx
"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export type QuickItem = {
  id: number | string;
  title: string;
  desc: string;
  href: string;
  image?: StaticImageData | string;
  bg?: string;
};

export default function ActionChips({ items }: { items: QuickItem[] }) {
  return (
    <section
      className={[
        // FULL BLEED on mobile; reintroduce modest edge padding above md+
        "w-full max-w-none mx-auto",
        // ↓ smaller top gap, bigger bottom gap on mobile; scale up slightly on larger screens
        // SIDE PADDING (edge == gutter from md and up). No side padding on mobile.
        "pt-3 pb-10 sm:pt-3 sm:pb-12 md:pt-4 md:pb-14 lg:pt-6 lg:pb-16",
        "px-0 md:px-4 lg:px-6 xl:px-6 2xl:px-6",
      ].join(" ")}
    >
      <div
        className={[
          "grid grid-cols-1 md:grid-cols-2",
          // MUCH SMALLER GAPS: base 8px, md 16px, lg 24px
          "gap-3 md:gap-4 lg:gap-6",
        ].join(" ")}
      >
        {items.map((it) => (
          <article
            key={it.id}
            style={{ backgroundColor: it.bg ?? "#FFFFFF" }}
            className={[
              "relative overflow-hidden rounded-none",
              "ring-1 ring-slate-200/70 bg-white shadow-[0_1px_0_rgba(2,6,23,0.04)]",
              // Slightly taller so reduced gutters don’t feel cramped
              "min-h-[380px] sm:min-h-[440px] md:min-h-[500px]",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-full flex-col items-center text-center",
                // Tighten top padding to remove the big void; keep nice breathing room
                "px-4 md:px-6 pt-4 sm:pt-5 md:pt-6",
              ].join(" ")}
            >
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                {it.title}
              </h3>
              <p className="mt-2 max-w-[50ch] text-slate-600">{it.desc}</p>

              <Link
                href={it.href}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Learn more <span aria-hidden>↗</span>
              </Link>

              {/* Only keep spacer from md+ so artwork isn't pushed too low on mobile */}
              <div className="hidden md:block md:flex-1" />

              {it.image && (
                <div
                  className={[
                    "relative w-full",
                    // Balanced artwork height; a bit taller as screen grows
                    "h-48 sm:h-56 md:h-64 lg:h-[18rem]",
                    // Consistent vertical rhythm
                    "mt-5 md:mt-3 mb-6",
                  ].join(" ")}
                >
                  <Image
                    src={it.image}
                    alt=""
                    fill
                    // Full width on mobile (no side whitespace), generous beyond
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 720px"
                    className="object-contain"
                    priority={false}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
