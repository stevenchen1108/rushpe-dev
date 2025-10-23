// src/app/ru-shine/data.ts
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
  avatar?: string;

  tagline?: string;
  story: string;
  now: string; // e.g., "Software Engineer · Atlassian (Platform)"
  roles?: string[];
  memory?: string;
  advice?: string;
  imageSrc: string; // spotlight hero image
  linkedin?: string;
  email?: string;
};

export const alumni: Alumni[] = [
//   {
//     slug: "marisol-alvarez",
//     name: "Marisol Alvarez",
//     grad: "Class of 2022 · B.S. Computer Engineering",
//     major: "Computer Engineering",
//     gradYear: 2022,
//     company: "Atlassian",
//     avatar: "/home-pg-assets/rushine.jpg",
//     tagline: "Say yes early, specialize later.",
//     story:
//       "At RU SHPE, Marisol led SHPEtinas outreach and built mentorship rings that paired first-years with upper-class mentors. Those weekly coffees turned into internships, research matches, and a sense of belonging. She credits the community’s feedback culture—ship, learn, repeat—for accelerating her growth as an engineer and leader.",
//     now: "Software Engineer · Atlassian (Platform Experience)",
//     roles: ["SHPEtinas Chair (2020–2021)", "Mentorship Lead (2019–2020)"],
//     memory:
//       "Road-tripping to SHPE National and cheering as three members landed on-site interviews in the expo hall.",
//     advice:
//       "Treat every semester like a mini-startup: pick one problem, form a small team, ship outcomes, and tell the story.",
//     imageSrc: "/home-pg-assets/rushine.jpg",
//     linkedin: "https://www.linkedin.com/",
//     email: "marisol@example.com",
//   },
];

export const getAllSlugs = () => alumni.map((a) => a.slug);
export const getAlumBySlug = (slug: string) => alumni.find((a) => a.slug === slug);
