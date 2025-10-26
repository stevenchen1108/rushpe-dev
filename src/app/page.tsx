// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import ActionChips from "@/components/ActionChips";
import WidgetCarousel from "@/components/WidgetCarousel";
import MissionShowcase from "@/components/MissionShowcase";

/* ----------------------------- Home assets ----------------------------- */
import asImage from "@/../public/home-pg-assets/academic-support.jpg";
import isImage from "@/../public/home-pg-assets/internship-scholarship.jpg";
import prImage from "@/../public/home-pg-assets/professionalism.jpg";
import neImage from "@/../public/home-pg-assets/networking.jpg";
import faImage from "@/../public/home-pg-assets/fun-activities.jpg";
import vnImage from "@/../public/home-pg-assets/volunteering.jpg";
import heroPoster from "@/../public/home-pg-assets/first-gbm-f24-3.jpg";

import geeseImage1 from "@/../public/home-pg-assets/events-geese.jpg";
import geeseImage2 from "@/../public/home-pg-assets/shpetina-geese.jpg";
import geeseImage3 from "@/../public/home-pg-assets/rushine-geese.jpg";
import geeseImage4 from "@/../public/home-pg-assets/shadow-program-geese.jpg";
import geeseImage5 from "@/../public/home-pg-assets/estamos-aqui.jpg";
import geeseImage6 from "@/../public/home-pg-assets/contact-geese.jpg";

/* ------------------------------ Social icons --------------------------- */
import igIcon from "@/../public/socials/instagram-logo.png";
import liIcon from "@/../public/socials/linkedin-logo.png";
import fbIcon from "@/../public/socials/facebook-logo.png";
import tkIcon from "@/../public/socials/tiktok-logo.png";

/* ------------------------------ Title logo ----------------------------- */
import sheLogo from "@/../public/she-logo.png";

export default function Home() {
  const quickItems = [
    {
      id: 0,
      title: "Upcoming Events",
      desc: "View our upcoming events & meetings.",
      href: "/events",
      image: geeseImage1,
      bg: "#FFDE7F",
    },
    {
      id: 1,
      title: "SHPEtinas",
      desc: "Visit our SHPEtinas page.",
      href: "/shpetinas",
      image: geeseImage2,
      bg: "#FC8785",
    },
    {
      id: 2,
      title: "RU Shine",
      desc: "Weekly alumni spotlight—network, learn, and connect.",
      href: "/ru-shine",
      image: geeseImage3,
      bg: "#88CDE3",
    },
    {
      id: 3,
      title: "Shadow-Program",
      desc: "Hands-on STEM projects and guided mentorship for high-school students.",
      href: "/shadow-program",
      image: geeseImage4,
      bg: "#B8DBA2",
    },
    {
      id: 4,
      title: "Estamos Aquí",
      desc: "Know your rights regardless of your citizenship status.",
      href: "/estamos-aqui",
      image: geeseImage5,
      bg: "#C9E4ED",
    },
    {
      id: 5,
      title: "Contact Us",
      desc: "Deliver questions, comments, or concerns.",
      href: "/contact",
      image: geeseImage6,
      bg: "#CEBFE8",
    },
  ];

  const widgetItems = [
    {
      id: 0,
      eyebrow: "Opportunities",
      title: "Internship & Scholarship",
      body: "Partner pipelines, touchpoints, and alerts.",
      href: "/corporate",
      image: isImage,
    },
    {
      id: 1,
      eyebrow: "Community",
      title: "Networking",
      body: "Alumni panels, mixers, and mentorship rings.",
      href: "/info/networking",
      image: neImage,
    },
    {
      id: 2,
      eyebrow: "Culture",
      title: "Fun Activities",
      body: "Socials, trips, and community celebrations.",
      href: "/events",
      image: faImage,
    },
    {
      id: 3,
      eyebrow: "Support",
      title: "Academic Support",
      body: "Study groups, tutoring, and resources.",
      href: "/info/academics",
      image: asImage,
    },
    {
      id: 4,
      eyebrow: "Service",
      title: "Volunteering",
      body: "Give back on campus and beyond.",
      href: "/events",
      image: vnImage,
    },
    {
      id: 5,
      eyebrow: "Professional",
      title: "Professionalism",
      body: "Workshops, résumés, and recruiting prep.",
      href: "/info/professionalism",
      image: prImage,
    },
  ];

  return (
    <main id="main" className="bg-white text-slate-900">
      {/* HERO (full-viewport on laptop/desktop) */}
      <section className="relative isolate">
        {/* Height controller — full viewport height on >=sm */}
        <div
          className="
           w-full overflow-hidden bg-slate-900
            min-h-[58svh] sm:min-h-[78svh] md:min-h-[82svh]
            max-h-[900px]
          "
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster.src}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/home-pg-assets/home-bg-vid-jan2025.mp4"
              type="video/mp4"
            />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.72),rgba(2,6,23,0.25),rgba(2,6,23,0.80))] sm:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.55),rgba(2,6,23,0.10),rgba(2,6,23,0.60))]" />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-[env(safe-area-inset-bottom)] pb-5 sm:px-6 sm:pb-10">
            <div className="max-w-xl rounded-xl bg-white/8 p-3 backdrop-blur-[2px] sm:max-w-3xl sm:rounded-2xl sm:p-4">
              {/* Title row with logo on the right */}
              <div className="flex items-center gap-3 sm:gap-4">
                <h1 className="text-[28px] leading-[1.1] font-extrabold tracking-tight text-white drop-shadow sm:text-5xl">
                  Welcome to Rutgers SHPE
                </h1>
                <Image
                  src={sheLogo}
                  alt="Rutgers SHPE logo"
                  priority
                  className="hidden sm:block h-8 sm:h-10 md:h-12 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                />
              </div>

              <p className="mt-2 text-white/90 text-base sm:mt-3 sm:max-w-prose sm:text-lg">
                We foster academic and professional growth for all
                students—rooted in community, mentorship, and opportunity.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
                <Link
                  href="/events"
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-700 px-5 py-2.5 text-white font-semibold shadow-md hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-700 sm:w-auto"
                >
                  View Events
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white/95 px-5 py-2.5 text-slate-900 font-semibold ring-1 ring-slate-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIALS SECTION (simple, clean) */}
      <section aria-labelledby="socials-title" className="relative">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="pt-6 sm:pt-7 md:pt-8" />
          <div className="text-center">
            <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Stay connected
            </span>
            <h2
              id="socials-title"
              className="mt-1 text-[22px] sm:text-[26px] md:text-[30px] leading-tight font-extrabold tracking-tight text-slate-900"
            >
              Follow us on our socials
            </h2>
          </div>
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-9 sm:gap-11 md:gap-12">
            <a
              href="https://www.instagram.com/shpe_ru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-transform hover:scale-110"
            >
              <Image
                src={igIcon}
                alt=""
                width={60}
                height={60}
                className="h-[56px] w-[56px] sm:h-[60px] sm:w-[60px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rutgers-university-shpe-686bba295"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-transform hover:scale-110"
            >
              <Image
                src={liIcon}
                alt=""
                width={60}
                height={60}
                className="h-[56px] w-[56px] sm:h-[60px] sm:w-[60px]"
              />
            </a>
            <a
              href="https://www.facebook.com/rutgers.she/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-transform hover:scale-110"
            >
              <Image
                src={fbIcon}
                alt=""
                width={60}
                height={60}
                className="h-[56px] w-[56px] sm:h-[60px] sm:w-[60px]"
              />
            </a>
            <a
              href="https://www.tiktok.com/@shpe_ru"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-transform hover:scale-110"
            >
              <Image
                src={tkIcon}
                alt=""
                width={60}
                height={60}
                className="h-[56px] w-[56px] sm:h-[60px] sm:w-[60px] rounded-[20%]"
              />
            </a>
          </div>
          <div className="pb-6 sm:pb-7 md:pb-8" />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <div className="bg-slate-50/60">
        <ActionChips items={quickItems} />
      </div>

      {/* MISSION */}
      <MissionShowcase
        images={[
          "/home-pg-assets/alumni-panel-f24.jpg",
          "/home-pg-assets/our-mission-bg.jpg",
          "/home-pg-assets/first-gbm-f24-1.jpg",
          "/home-pg-assets/first-gbm-f24-2.jpg",
          "/home-pg-assets/first-gbm-f24-3.jpg",
          "/home-pg-assets/cultural-gbm-f24-1.jpg",
        ]}
        intervalSec={7}
        title="Our Mission"
        body="“Recruit, retain, and graduate minority students majoring in engineering, math, and science.” You do not have to be Hispanic to join. We welcome everyone."
        cta={{ label: "Learn more", href: "/about-us#mission" }}
      />

      {/* LARGE WIDGETS */}
      <div className="bg-[#eeeeee]">
        <WidgetCarousel
          title="Support, opportunities, and community—on campus and beyond."
          subtitle="Swipe or use the arrows to explore what we offer."
          items={widgetItems}
        />
      </div>
    </main>
  );
}
