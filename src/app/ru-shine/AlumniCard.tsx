// src/app/ru-shine/AlumniCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type AlumniCardProps = {
  href: string;
  name: string;
  major?: string;
  gradYear?: number | string;
  company?: string;
  imageSrc?: string;
  focal?: string;           // e.g., "50% 40%"
  eager?: boolean;
};

export default function AlumniCard({
  href,
  name,
  major,
  gradYear,
  company,
  imageSrc,
  focal = "50% 40%",
  eager = false,
}: AlumniCardProps) {
  const [imgError, setImgError] = useState(false);
  const classYearText = gradYear ? `Class of ${gradYear}` : "";

  return (
    <Link
      href={href}
      aria-label={`Open ${name} profile`}
      className={[
        // Card shell
        "group relative block rounded-[32px] bg-white",
        "border border-slate-200/70 shadow-[0_24px_50px_-22px_rgba(2,6,23,.25)]",
        "transition will-change-transform hover:-translate-y-[2px] hover:shadow-[0_32px_70px_-26px_rgba(2,6,23,.35)]",
      ].join(" ")}
    >
      {/* Top image with generous rounding like the screenshot */}
      <div className="p-3 sm:p-4">
        <div className="relative w-full overflow-hidden rounded-[28px]">
          <div className="aspect-[4/3] sm:aspect-[16/11]">
            {!!imageSrc && !imgError ? (
              <Image
                src={imageSrc}
                alt={`${name} portrait`}
                fill
                className="object-cover"
                style={{ objectPosition: focal }}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                priority={eager}
                loading={eager ? "eager" : "lazy"}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-full w-full bg-slate-100" />
            )}
          </div>
        </div>
      </div>

      {/* Text section below the photo (no glass; clean white like the example) */}
      <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
        {/* Name */}
        <h3
          className="text-[1.45rem] sm:text-[1.6rem] font-black leading-tight tracking-tight text-slate-900"
          style={{ letterSpacing: "-0.01em" }}
        >
          {name}
        </h3>

        {/* Major · Class of YYYY (keeps your original info) */}
        {(major || classYearText) && (
          <p className="mt-2 text-[15px] sm:text-[16px] leading-7 text-slate-600">
            {major}
            {major && classYearText ? " · " : ""}
            {classYearText}
          </p>
        )}

        {/* Company line (optional) */}
        {company && (
          <p className="mt-1.5 text-[15px] sm:text-[16px] leading-7 text-slate-600">
            <span className="font-medium text-slate-800">Company:</span> {company}
          </p>
        )}

        {/* CTA */}
        <div className="mt-4">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2
                       text-sm font-semibold text-white shadow-sm transition
                       hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Read spotlight
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
