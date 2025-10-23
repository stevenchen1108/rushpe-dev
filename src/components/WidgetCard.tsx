"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type WidgetCardProps = {
  id: string | number;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image: StaticImageData;
};

type Props = {
  item: WidgetCardProps;
  density?: "compact" | "comfortable" | "roomy";
};

export default function WidgetCard({ item, density = "comfortable" }: Props) {
  const PAD = {
    compact: "px-4 pt-4 pb-4 sm:px-5 sm:pt-5 sm:pb-5",
    comfortable: "px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6",
    roomy: "px-6 pt-6 pb-6 sm:px-7 sm:pt-7 sm:pb-7",
  }[density];

  // ↑ made each preset a touch roomier
  // ↓ MEDIA made a bit taller overall (smaller ratios = taller cards)
  const MEDIA = {
    compact: "aspect-[5/4] sm:aspect-[4/3] lg:aspect-[3/2]",
    comfortable: "aspect-[5/4] sm:aspect-[4/3] lg:aspect-[3/2]",
    roomy: "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/3]", // use if you want clearly taller cards
  }[density];

  return (
    <article
      className={[
        "relative w-full overflow-hidden rounded-xl sm:rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm",
        "grid grid-rows-[auto,auto,auto]",
      ].join(" ")}
    >
      {/* Header */}
      <div className={PAD.replace("pb", "pb-0")}>
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
          {item.eyebrow}
        </p>
        <h3 className="mt-0.5 text-[18px] sm:text-[20px] font-extrabold tracking-tight text-slate-900 leading-snug line-clamp-2">
          {item.title}
        </h3>
        <p className="mt-1 text-[13px] sm:text-[14px] text-slate-600 leading-snug line-clamp-2 sm:line-clamp-3">
          {item.body}
        </p>
      </div>

      {/* Media — slightly taller */}
      <div className={["relative mt-3 overflow-hidden rounded-lg sm:rounded-2xl mx-4 sm:mx-6", MEDIA].join(" ")}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover [object-position:center_30%]"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 32vw"
        />
      </div>

      {/* CTA */}
      <div className={PAD.replace("pt", "pt-3")}>
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          aria-label={`Learn more about ${item.title}`}
        >
          Learn more <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}
