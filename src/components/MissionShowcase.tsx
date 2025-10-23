// components/MissionShowcase.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  images: (string | any)[];
  intervalSec?: number; // autoplay (0 = off)
  title: string;
  body: string;
  cta?: { label: string; href: string };
  className?: string;
  // NEW: show dots below (outside the image card)
  dotsBelow?: boolean;
};

export default function MissionShowcase({
  images,
  intervalSec = 5,
  title,
  body,
  cta = { label: "Learn more", href: "/about-us#mission" },
  className = "",
  dotsBelow = true,
}: Props) {
  const DURATION = 450;

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [phase, setPhase] = useState<"idle" | "start" | "run">("idle");

  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastWheelTs = useRef(0);
  const WHEEL_COOLDOWN = 350;

  const len = images?.length ?? 0;
  const hasMany = len > 1;

  const getDir = (from: number, to: number): 1 | -1 => {
    const forward = (to - from + len) % len;
    const backward = (from - to + len) % len;
    return forward <= backward ? 1 : -1;
  };

  const animateTo = (next: number) => {
    if (len < 2 || next === index) return;
    setPrevIndex(index);
    setDir(getDir(index, next));
    setIndex(((next % len) + len) % len);
    setPhase("start");
    requestAnimationFrame(() => {
      setPhase("run");
      window.setTimeout(() => setPhase("idle"), DURATION);
    });
  };

  const next = () => animateTo(index + 1);
  const prev = () => animateTo(index - 1);
  const go = (i: number) => animateTo(i);

  // autoplay
  useEffect(() => {
    if (!hasMany || !intervalSec) return;
    timerRef.current = window.setTimeout(next, intervalSec * 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMany, intervalSec]);

  // keyboard
  useEffect(() => {
    if (!hasMany) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMany]);

  // touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 40;
    if (delta > THRESHOLD) prev();
    if (delta < -THRESHOLD) next();
    touchStartX.current = null;
  };

  // trackpad / wheel
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!hasMany) return;
    const now = Date.now();
    if (now - lastWheelTs.current < WHEEL_COOLDOWN) return;
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (dx > 25) {
      next();
      lastWheelTs.current = now;
    } else if (dx < -25) {
      prev();
      lastWheelTs.current = now;
    }
  };

  if (!len) return null;

  // Slide transforms
  const baseImgCls = "absolute inset-0 will-change-transform transition-transform ease-in-out";
  const styleRun = { transitionDuration: `${DURATION}ms` };
  const prevTransform =
    phase === "start" || phase === "run"
      ? phase === "start"
        ? "translateX(0%)"
        : `translateX(${dir === 1 ? -100 : 100}%)`
      : "translateX(-200%)";
  const currTransform =
    phase === "start" || phase === "run"
      ? phase === "start"
        ? `translateX(${dir === 1 ? 100 : -100}%)`
        : "translateX(0%)"
      : "translateX(0%)";

  // Dots UI (reused for below & overlay versions)
    const Dots = ({ overlay = false }: { overlay?: boolean }) => (
    <div
      className={[
        "flex justify-center items-center gap-3",              // larger gap
        overlay ? "absolute bottom-4 left-0 right-0" : "mt-6", // a touch more offset below
      ].join(" ")}
      role="tablist"
      aria-label="Slide navigation"
    >
      {images.map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={active}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => go(i)}
            className={[
              // Strict circles, bigger size (10px)
              "h-2.5 w-2.5 rounded-full transition-colors duration-200",
              // Active/inactive colors (Apple-like greys; active darker)
              active ? "bg-slate-900/85" : "bg-slate-400/55 hover:bg-slate-500/70",
              // Optional glass when overlayed; safe focus
              overlay ? "backdrop-blur-md" : "",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet",
            ].join(" ")}
          />
        );
      })}
    </div>
  );

  return (
    <section
      className={[
        // spacing
        "w-full max-w-none mx-auto",
        "pt-0 pb-10 sm:pt-1 sm:pb-12 md:pt-2 md:pb-14 lg:pt-3 lg:pb-16",
        "px-0 md:px-4 lg:px-6 xl:px-6 2xl:px-6",
        className,
      ].join(" ")}
      aria-label="Mission showcase"
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-none ring-1 ring-slate-200 shadow-sm"
        onWheel={onWheel}
      >
        <div
          className="relative h-[440px] sm:h-[520px] lg:h-[560px] w-full select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-live="polite"
        >
          {/* Prev (during animation only) */}
          {(phase === "start" || phase === "run") && (
            <Image
              key={`prev-${prevIndex}`}
              src={images[prevIndex]}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className={`${baseImgCls} object-cover`}
              style={{ ...styleRun, transform: prevTransform as any }}
              priority={false}
            />
          )}

          {/* Current */}
          <Image
            key={`curr-${index}`}
            src={images[index]}
            alt="Rutgers SHPE mission gallery image"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className={`${baseImgCls} object-cover`}
            style={{ ...styleRun, transform: currTransform as any }}
            priority={false}
          />

          {/* Gradient shelf */}
          <div className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />
            <div className="sm:hidden absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/75 via-slate-900/40 to-transparent" />
          </div>

          {/* Text */}
          <div className="absolute inset-0 grid">
            <div className="m-4 md:m-6 lg:m-8 self-end sm:self-center sm:justify-self-start sm:max-w-md text-white">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow">
                {title}
              </h2>
              <p className="mt-3 text-white/90 sm:text-lg">{body}</p>
              <div className="mt-5">
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-slate-900 font-semibold ring-1 ring-white/70 backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
                >
                  {cta.label}
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* If you still want overlay dots on top of the image, flip this to true */}
          {!dotsBelow && hasMany && <Dots overlay />}
        </div>
      </div>

      {/* NEW: dots below the card in the white space (Apple-like) */}
      {dotsBelow && hasMany && <Dots />}
    </section>
  );
}
