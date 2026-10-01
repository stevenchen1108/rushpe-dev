import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/shpe_ru/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rutgers-university-shpe-686bba295", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/rutgers.she/", icon: FaFacebook },
  { label: "TikTok", href: "https://www.tiktok.com/@shpe_ru", icon: FaTiktok },
];

const columns = [
  {
    title: "Resources",
    links: [
      { label: "Events", href: "/events" },
      { label: "Executive Board", href: "/executive-board" },
      { label: "Corporate Partners", href: "/corporate" },
      { label: "Contact Us", href: "/contact" },
      { label: "Estamos Aquí", href: "/estamos-aqui" },
    ],
  },
  {
    title: "Outreach & Initiatives",
    links: [
      { label: "K–12 Outreach", href: "/shadow-program" },
      { label: "SHPEtinas", href: "/shpetinas" },
      { label: "Volunteer", href: "/events" },
      { label: "Alumni Spotlight", href: "/ru-shine" },
    ],
  },
];

const aboutLinks = [
  { label: "Mission & History", href: "/about-us#mission" },
  { label: "Our Pillars", href: "/about-us#affiliation" },
  { label: "Constitution (PDF)", href: "/about-us#constitution" },
];

const connectLinks = [
  { label: "Email: rushpe@gmail.com", href: "mailto:rushpe@gmail.com" },
  {
    label: "600 Bartholomew Rd, Piscataway, NJ",
    href: "https://maps.google.com/?q=600+Bartholomew+Rd+Piscataway+NJ+08854",
  },
];

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="rounded text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function FooterBar() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-x-12">
          <div>
            <Link
              href="/"
              aria-label="Rutgers SHPE Home"
              className="inline-block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-4"
            >
              <Image
                src="/she-logo.png"
                alt="Rutgers SHPE logo"
                width={472}
                height={472}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
            </Link>
            <nav aria-label="Rutgers SHPE social media" className="mt-5">
              <ul className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Rutgers SHPE on ${social.label}`}
                      className="group grid h-11 w-11 place-items-center rounded-lg text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                    >
                      <social.icon aria-hidden="true" className="h-7 w-7 motion-safe:transition-transform motion-safe:group-hover:scale-110 sm:h-8 sm:w-8" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{col.title}</h3>
              <FooterLinks links={col.links} />
            </nav>
          ))}
          <div className="space-y-9">
            <nav aria-label="About Rutgers SHPE">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">About Rutgers SHPE</h3>
              <FooterLinks links={aboutLinks} />
            </nav>
            <nav aria-label="Connect">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Connect</h3>
              <FooterLinks links={connectLinks} />
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-6">
          <ul className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-sm text-slate-500 sm:justify-end">
            <li>© {new Date().getFullYear()} Rutgers SHPE</li>
            <li>
              <Link
                href="/contact"
                className="rounded hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
