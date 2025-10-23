// src/app/ru-shine/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AlumniCard from "./AlumniCard";
import { alumni } from "./data";

const HERO_IMAGE = "/ru-shine/alumni-geese.jpg";

/* ----------------------------- Motion ------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
} as const;

export default function RuShineHubPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-4 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl sm:max-w-3xl lg:max-w-4xl lg:col-span-7"
          >
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(1.9rem,6.2vw,4.25rem)] leading-tight font-extrabold tracking-tight
                         bg-[linear-gradient(90deg,#7f1d1d_0%,#991b1b_30%,#b91c1c_60%,#dc2626_100%)]
                         bg-clip-text text-transparent"
            >
              Rutger SHPE Alumni ShowCase
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-[clamp(0.98rem,1.4vw,1.2rem)] leading-7 sm:leading-8 text-slate-700"
            >
              Celebrate where RU SHPE alumni are today. Browse highlights and click a card to read
              their story—what they built here, and how they’re making impact now.
            </motion.p>
          </motion.div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto lg:ml-auto lg:mr-0 w-[68vw] max-w-[320px] sm:max-w-[360px] aspect-square overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="RU-SHINE showcase graphic"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 320px, 360px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto mt-6 sm:mt-10 lg:mt-12 max-w-7xl px-4 sm:px-6 pb-24 md:pb-28 lg:pb-32 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {alumni.map((a) => (
            <motion.div key={a.slug} variants={fadeUp}>
              <AlumniCard
                href={`/ru-shine/${a.slug}`}
                name={a.name}
                major={a.major}
                gradYear={a.gradYear ?? a.grad?.match(/\d{4}/)?.[0]}
                company={a.company}
                imageSrc={a.avatar || a.imageSrc}
                focal="50% 40%"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
