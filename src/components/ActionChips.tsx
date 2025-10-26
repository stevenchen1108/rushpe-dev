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
        "w-full max-w-none mx-auto",
        "pt-3 pb-10 sm:pt-3 sm:pb-12 md:pt-4 md:pb-14 lg:pt-6 lg:pb-16",
        "px-0 md:px-4 lg:px-6 xl:px-6 2xl:px-6",
      ].join(" ")}
    >
      <div
        className={[
          "grid grid-cols-1 md:grid-cols-2",
          "gap-3 md:gap-4 lg:gap-6",
        ].join(" ")}
      >
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            style={{ backgroundColor: it.bg ?? "#FFFFFF" }}
            className={[
              "group relative block overflow-hidden rounded-none",
              "ring-1 ring-slate-200/70 bg-white shadow-[0_1px_0_rgba(2,6,23,0.04)]",
              "min-h-[380px] sm:min-h-[440px] md:min-h-[500px]",
              "transition hover:shadow-md focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900",
              "cursor-pointer",
            ].join(" ")}
            aria-label={`${it.title} — open ${it.href}`}
          >
            <div
              className={[
                "flex h-full flex-col items-center text-center",
                "px-4 md:px-6 pt-4 sm:pt-5 md:pt-6",
              ].join(" ")}
            >
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                {it.title}
              </h3>
              <p className="mt-2 max-w-[50ch] text-slate-600">{it.desc}</p>

              {/* Visual CTA (not a separate link) */}
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-white font-semibold transition group-hover:bg-slate-800">
                Learn more <span aria-hidden></span>
              </span>

              <div className="hidden md:block md:flex-1" />

              {it.image && (
                <div
                  className={[
                    "relative w-full",
                    "h-48 sm:h-56 md:h-64 lg:h-[18rem]",
                    "mt-5 md:mt-3 mb-6",
                  ].join(" ")}
                >
                  <Image
                    src={it.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 720px"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    priority={false}
                  />
                </div>
              )}
            </div>

            {/* Expand hit area (doesn't change semantics) */}
            <span className="absolute inset-0" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
