"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaRegFilePdf } from "react-icons/fa";

// Assets (keep your existing paths)
import faceOffImg from "@/../public/about-pg-assets/about-us-bg.jpg";
import gbmBuildImg from "@/../public/about-pg-assets/about-us-image.png";
import pillarsGphc from "@/../public/about-pg-assets/pillars-graphic.png";

// Animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.55]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* HERO */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <Image
            src={faceOffImg}
            alt="SHE at Rutgers – community at Club Fair"
            placeholder="blur"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* gradient/overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_10%,rgba(14,165,233,0.25),transparent_60%),linear-gradient(to_bottom,rgba(2,6,23,0.70),rgba(2,6,23,0.55),rgba(2,6,23,0.25))]"
        />

        {/* content */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: readable glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-white/85 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <motion.h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              About Us
            </motion.h1>
            <motion.p className="mt-5 max-w-prose text-base/7 text-slate-700 sm:text-lg/8">
              <b>The Society of Hispanic Engineers</b> (SHE) is the Rutgers University student chapter of the Society of Hispanic Professional Engineers (SHPE). Established in 1984 by seven Hispanic engineering students, SHE began as a space to address cultural concerns and build community. Guided by the motto <b>“Recruit, Retain, and Graduate”</b> minority students majoring in engineering, math, or science, SHE operated independently until 1988, when it became a recognized SHPE chapter.
            </motion.p>
            <div className="mt-8 flex items-center gap-4">
              <ConstitutionCTA />
            </div>
          </motion.div>

          {/* Right: visual card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[20rem] w-full overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm md:h-[28rem]"
          >
            <Image
              src={gbmBuildImg}
              alt="SHE members building a structure"
              placeholder="blur"
              fill
              className="object-cover"
            />
            {/* corner shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* curved divider */}
        <svg className="-mb-1 block w-full text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </section>

      {/* CONSTITUTION + PILLARS */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Constitution card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
            <header className="flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <FaRegFilePdf aria-hidden className="text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">View Our Constitution</h2>
            </header>
            <p className="mt-4 text-slate-600">Read the latest chapter constitution, including mission, membership, and governance.</p>
            <div className="mt-6">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://86a86efc-320b-46b2-94e8-dd1980d85076.filesusr.com/ugd/65eba6_e140d782f90b4d95b50de77266162ca7.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 active:translate-y-0"
              >
                <span>Open PDF</span>
                <span aria-hidden className="i-lucide-arrow-up-right" />
              </Link>
            </div>
          </motion.article>

          {/* Pillars visual */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl"
          >
            <div className="relative w-full">
              <Image
                src={pillarsGphc}
                alt="Pillars of SHE graphic"
                placeholder="blur"
                width={2000}
                height={800}
                className="rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-slate-500">Our pillars guide programming, mentorship, and community impact.</figcaption>
          </motion.figure>
        </div>
      </section>

      {/* FOOTER micro-interaction line */}
      <footer className="mx-auto max-w-7xl px-6 pb-16">
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="origin-left border-none bg-gradient-to-r from-slate-200 via-sky-200 to-slate-200 h-px"
        />
        <div className="mt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} SHE at Rutgers University</div>
      </footer>
    </main>
  );
}

function ConstitutionCTA() {
  return (
    <Link
      href="https://86a86efc-320b-46b2-94e8-dd1980d85076.filesusr.com/ugd/65eba6_e140d782f90b4d95b50de77266162ca7.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      aria-label="Open chapter constitution PDF"
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/90 text-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <FaRegFilePdf aria-hidden className="text-xl" />
      </span>
      <span className="relative">
        <span className="block text-base font-semibold">View Our Constitution</span>
        <span className="block text-white/80">PDF, opens in a new tab</span>
      </span>
    </Link>
  );
}
