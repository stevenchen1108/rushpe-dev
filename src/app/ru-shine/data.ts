// src/app/ru-shine/data.ts
import type { StaticImageData } from "next/image";

// ---- Static imports from /public (recommended) ----
// Place your files at: /public/ru-shine/david-fabian.jpg, /public/home-pg-assets/rushine.jpg
import davidFabian from "@/../public/ru-shine/david-fabian.jpg";
import rushineAvatar from "@/../public/ru-shine/alumni-geese.jpg";

/** Full spotlight record used by the hub and detail pages */
export type Alumni = {
  slug: string;
  name: string;
  /** e.g., "Class of 2022 · B.S. Computer Engineering" */
  grad: string;

  /** Hub card metadata (optional but recommended) */
  major?: string;
  gradYear?: number;
  company?: string;

  /** Optional square/portrait image for hub card (falls back to imageSrc) */
  avatar?: string | StaticImageData;

  tagline?: string;
  story: string;
  now: string;                // e.g., "Software Engineer · Atlassian (Platform)"
  roles?: string[];
  memory?: string;
  advice?: string;

  /** Spotlight hero image (also used on the card when avatar missing) */
  imageSrc: string | StaticImageData;

  linkedin?: string;
  email?: string;
};

export const alumni: Alumni[] = [
  {
    slug: "david-fabian",
    name: "David Fabian",
    grad: "Class of 2025 · B.S. Computer Science",
    major: "Computer Science",
    gradYear: 2025,
    company: "Lockheed Martin",
    avatar: davidFabian,                                // static import (safe)
    tagline:
      "The day you plant the seed is probably not the day you eat the fruit.",
    story:
      "Hi everyone! I was involved in SHE throughout my entire undergraduate life at Rutgers, especially during my last year. The conventions/career fairs I attended with the organization kickstarted my professional career as a software engineer! I've made many fun memories as a member and I'm grateful for the opportunities it has given me. Currently, I work as a software engineering associate at Lockheed Martin.",
    now: "Software Engineer · Lockheed Martin",
    roles: ["Webmaster (2024-2025)"],
    memory:
      "Networking in Anaheim and traveling around the convention hanging with friends.",
    advice:
      "Have a growth-mindset and constantly invest in your professional development! Progressing in your career isn't based on luck, but rather on consistency!",
    imageSrc: davidFabian,                             // static import (safe)
    linkedin: "https://www.linkedin.com/in/david-a-fabian",
    email: "daf217@scarletmail.rutgers.edu",
  },
];

export const getAllSlugs = () => alumni.map((a) => a.slug);
export const getAlumBySlug = (slug: string) => alumni.find((a) => a.slug === slug);
