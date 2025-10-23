// src/app/shpetinas/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Users, GraduationCap, Sparkles, X, Download } from 'lucide-react';

const MAIL_TO = 'mailto:community@rushpe.org';
const APPLY_URL = 'https://YOUR_GOOGLE_FORM_URL';

/* --------- Assets --------- */
import heroWide from '@/../public/shpetinas/shpetinas-banner1.jpg';
import committeePhoto from '@/../public/shpetinas/shpetinas-commitee.jpeg';
import shapeherGroup from '@/../public/shpetinas/shapeher-group-photo.jpg';

/* Collage images */
import c1 from '@/../public/shpetinas/kickoff-event-photo1.jpg';
import c2 from '@/../public/shpetinas/kickoff-event-photo2.jpg';
import c3 from '@/../public/shpetinas/shpetinas-banner2.jpg';
import c4 from '@/../public/shpetinas/shpetinas-commitee.jpeg';
import c5 from '@/../public/shpetinas/shapeher-photo.jpg';
import c6 from '@/../public/shpetinas/shpetina-1.jpg';
import c7 from '@/../public/shpetinas/shpetina-2.jpg';
import c8 from '@/../public/shpetinas/shpetina-3.jpg';
import c9 from '@/../public/shpetinas/shpetina-4.jpg';

/* Resources */
import ricapImg from '@/../public/shpetinas/resources/ricap.jpg';
import hesaaImg from '@/../public/shpetinas/resources/hesaa.jpg';
import owhImg from '@/../public/shpetinas/resources/owh.jpg';

const sectionTitle =
  'text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900';

/* =========================================================
   PAGE (single page, keeps everything together)
========================================================= */
export default function ShpetinasPage() {
  const COLLAGE = useMemo(() => [c1, c2, c3, c4, c5, c6, c7, c8, c9], []);
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);

  return (
    <main className="text-neutral-900">
      {/* ===== Banner ===== */}
      <section className="relative bg-white">
        <div className="relative h-[46vw] max-h-[520px] min-h-[260px] w-full">
          <Image
            src={heroWide}
            alt="SHPEtinas banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* ===== Hero copy ===== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 pt-6 pb-10 sm:pt-10">
          <h1 className="text-[clamp(2rem,4.2vw,3.6rem)] font-extrabold leading-tight">
            Empowering <span className="text-[#FFB5C0]">Latinas</span> in STEM
          </h1>

          <p className="mt-4 max-w-3xl text-[17px] leading-7 text-neutral-700">
            Mentorship, professional growth, and a strong community—built by
            and for women in STEM at Rutgers.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href="#shape-her" variant="primary">
              Explore SHaPE Her
            </ActionButton>
            <ActionButton href={MAIL_TO}>Email Us</ActionButton>
            <ActionButton href={APPLY_URL} external>
              Apply
            </ActionButton>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ValueTile
              icon={<Users className="h-5 w-5" aria-hidden="true" />}
              title="Community"
              copy="Inclusive, uplifting, and collaborative"
              tone="rose"
            />
            <ValueTile
              icon={<GraduationCap className="h-5 w-5" aria-hidden="true" />}
              title="Mentorship"
              copy="Peer & alumni guidance that lasts"
              tone="violet"
            />
            <ValueTile
              icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
              title="Moments"
              copy="Workshops, socials, and growth"
              tone="amber"
            />
          </div>
        </div>
      </section>

      {/* ===== Who we are ===== */}
      <section className="bg-rose-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-12 sm:grid-cols-2">
          <div className="flex items-center">
            <div>
              <h2 className={sectionTitle}>Who are we?</h2>
              <p className="mt-4 text-[17px] leading-7 text-neutral-700">
                SHPEtinas is a program designed to{' '}
                <em>accelerate and affirm Latina representation</em> at all
                levels of STEM corporate and academic leadership.
              </p>
              <p className="mt-3 text-[17px] leading-7 text-neutral-700">
                At Rutgers, the <strong>SHPEtinas committee</strong> empowers
                ALL women in STEM through mentorship, professional development,
                and community collaboration.
              </p>
            </div>
          </div>
          <div className="relative h-[280px] w-full rounded-3xl shadow-md ring-1 ring-black/10 sm:h-[360px]">
            <Image
              src={committeePhoto}
              alt="SHPEtinas Committee"
              fill
              className="rounded-3xl object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ===== SHaPE Her ===== */}
      <section id="shape-her" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="relative h-[260px] w-full rounded-3xl shadow-md ring-1 ring-black/10 sm:h-[360px]">
              <Image
                src={shapeherGroup}
                alt="SHaPE Her group"
                fill
                className="rounded-3xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className={sectionTitle}>SHaPE Her Mentorship</h2>
              <p className="mt-4 text-[17px] leading-7 text-neutral-700">
                <strong>SHaPE Her</strong> empowers women in STEM through
                mentorship, professional development, and community
                collaboration—bridging the gap between aspiring engineers and
                experienced professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ActionButton href={APPLY_URL} variant="primary" external>
                  Apply
                </ActionButton>
                <ActionButton href={MAIL_TO}>Email Us</ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Resources ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="rounded-3xl bg-rose-50 p-6 sm:p-8 ring-1 ring-black/10">
            <h2 className={sectionTitle}>Support that powers your journey</h2>
            <p className="mt-3 max-w-3xl text-[17px] leading-7 text-neutral-700">
              Legal aid, financial aid, and health resources we recommend to
              students and families.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <ResourceCard
                tag="RICAP"
                title="Immigration Legal Services"
                copy="Fostering a safe campus and removing barriers to success with confidential, no-cost legal consultations."
                href="https://law.rutgers.edu/information-for/get-legal-help/rutgers-immigrant-community-assistance-project"
                img={ricapImg}
              />
              <ResourceCard
                tag="HESAA"
                title="Financial Aid for NJ Dreamers"
                copy="New Jersey’s agency for financial and informational resources for post-secondary education."
                href="https://www.hesaa.org/pages/njalternativeapplication.aspx"
                img={hesaaImg}
              />
              <ResourceCard
                tag="OWH"
                title="Office on Women’s Health"
                copy="Policies, education, and programs to help all women and girls achieve the best possible health."
                href="https://womenshealth.gov/about-us/what-we-do"
                img={owhImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Moments & Community (VSCO grid + centered lightbox) ===== */}
      <section className="bg-rose-50">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className={sectionTitle}>Moments & Community</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-7 text-neutral-700">
            Tap any photo to open it larger and download.
          </p>

          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {COLLAGE.map((img, i) => (
              <li key={i} className="list-none">
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({
                      src: (img as any).src ?? (img as unknown as string),
                      alt: `Moment ${i + 1}`,
                    })
                  }
                  className="relative w-full overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-black/10 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033] aspect-[4/3]"
                  aria-label={`Open photo ${i + 1}`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={img}
                      alt={`Moment ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      placeholder="empty"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lightbox modal */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  );
}

/* ================== Local atoms ================== */

function ActionButton({
  href,
  children,
  variant = 'secondary',
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-[#cc0033] text-white hover:bg-[#a8002a] focus-visible:ring-[#cc0033]'
      : 'bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:ring-[#cc0033]';
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${styles}`}
    >
      {children}
      <span aria-hidden className="inline-block">↗</span>
    </Link>
  );
}

type Tone = 'rose' | 'violet' | 'amber';

function ValueTile({
  icon,
  title,
  copy,
  tone = 'rose',
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  tone?: Tone;
}) {
  const toneRing =
    tone === 'rose' ? 'ring-rose-200/60' : tone === 'violet' ? 'ring-violet-200/60' : 'ring-amber-200/60';
  const toneBadge =
    tone === 'rose' ? 'bg-rose-50 text-rose-700' : tone === 'violet' ? 'bg-violet-50 text-violet-700' : 'bg-amber-50 text-amber-700';
  const toneIcon =
    tone === 'rose' ? 'from-rose-500/15 to-rose-400/10' : tone === 'violet' ? 'from-violet-500/15 to-violet-400/10' : 'from-amber-500/15 to-amber-400/10';

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm',
        'ring-1 ring-black/10 hover:shadow-md transition',
        'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#cc0033]',
        toneRing,
      ].join(' ')}
      tabIndex={-1}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${toneIcon} blur-2xl transition opacity-60 group-hover:opacity-80`}
      />
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-50 ring-1 ring-black/10 group-hover:translate-y-[-2px] transition">
          <span className="text-neutral-700">{icon}</span>
        </div>
        <div className="min-w-0">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneBadge}`}
          >
            {title}
          </span>
          <p className="mt-2 text-[15px] leading-6 text-neutral-700">{copy}</p>
        </div>
      </div>
    </article>
  );
}

function ResourceCard({
  tag,
  title,
  copy,
  href,
  img,
}: {
  tag: string;
  title: string;
  copy: string;
  href: string;
  img: any;
}) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/10">
      <div>
        <div className="mb-3 inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
          {tag}
        </div>

        <div className="mb-4 flex items-start gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10">
            <Image src={img} alt={`${tag} logo`} fill className="object-cover" />
          </div>
          <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        </div>

        <p className="text-[15px] leading-6 text-neutral-700">{copy}</p>
      </div>

      <div className="mt-5">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          aria-label={`Visit resource: ${title}`}
        >
          Visit resource
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full bg-neutral-900 text-white"
          >
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}

/* ---------- Lightbox (centered image, navbar-safe, scroll lock) ---------- */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const [navH, setNavH] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    // Lock page scroll while modal is open
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';

    // Measure sticky navbar height so the overlay starts below it
    const header = document.querySelector('header') as HTMLElement | null;
    setNavH(header ? Math.ceil(header.getBoundingClientRect().height) : 0);

    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1100] grid place-items-center bg-black/75"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ paddingTop: navH }}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Centered image area */}
        <div className="grid h-[86vh] w-full place-items-center">
          <div className="relative h-full w-full">
            <Image src={src} alt={alt} fill className="object-contain" priority />
          </div>
        </div>

        {/* Top-right controls */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          <a
            href={src}
            download
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]"
            aria-label="Download image"
            title="Download"
          >
            <Download className="h-5 w-5" />
          </a>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]"
            aria-label="Close"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
