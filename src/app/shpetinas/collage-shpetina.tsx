// /app/shpetinas/collage-shpetina.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

import heroWide from '@/../public/shpetinas/shpetinas-banner1.jpg';

// IMPORT IMAGES HERE 
import collage1 from '@/../public/shpetinas/kickoff-event-photo1.jpg';
import collage2 from '@/../public/shpetinas/kickoff-event-photo2.jpg';
import collage3 from '@/../public/shpetinas/shpetinas-banner2.jpg';
import collage4 from '@/../public/shpetinas/shpetinas-commitee.jpeg';
import collage5 from '@/../public/shpetinas/shapeher-photo.jpg';
import collage6 from '@/../public/shpetinas/shpetina-1.jpg';
import collage7 from '@/../public/shpetinas/shpetina-2.jpg';
import collage8 from '@/../public/shpetinas/shpetina-3.jpg';

const sectionTitle =
  'text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900';

// ADD MORE IMAGES HERE 
export default function ShpetinasCollagePage() {
  const IMGS = [collage1, collage2, collage3, collage4, collage5, collage6, collage7, collage8];
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);

  return (
    <main className="text-neutral-900 bg-rose-50 min-h-screen">
      {/* Optional banner echo */}
      <section className="relative">
        <div className="relative h-[34vw] max-h-[360px] min-h-[200px] w-full">
          <Image src={heroWide} alt="SHPEtinas banner" fill priority className="object-cover" sizes="100vw" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-rose-50" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className={sectionTitle}>Moments & Community</h1>
          <Link
            href="/shpetinas"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/10 shadow hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033] focus-visible:ring-offset-2"
          >
            ← Back to SHPEtinas
          </Link>
        </div>
        <p className="mt-3 max-w-3xl text-[17px] leading-7 text-neutral-700">
          Tap any photo to open it larger and download.
        </p>

        <VSCOGrid
          images={IMGS}
          onOpen={(img, idx) =>
            setLightbox({
              src: typeof img === 'string' ? img : (img as any).src,
              alt: `Moment ${idx + 1}`,
            })
          }
        />
      </section>

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

/* ---------- VSCO-style collage (click to open) ---------- */
function VSCOGrid({
  images,
  onOpen,
}: {
  images: any[];
  onOpen: (img: any, idx: number) => void;
}) {
  // Staggered, VSCO-like tile shapes
  const pattern = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]'];

  return (
    <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {images.map((img, i) => (
        <li key={i} className="list-none">
          <button
            type="button"
            onClick={() => onOpen(img, i)}
            className={`relative w-full overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-black/10 shadow-sm transition hover:shadow-md ${pattern[i % pattern.length]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]`}
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
  );
}

/* ---------- Lightbox with Download ---------- */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1280}
          className="h-auto w-full object-contain"
          priority
        />

        {/* Top controls */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-3">
          <span className="sr-only">{alt}</span>
          <div />
          <div className="flex items-center gap-2">
            <a
              href={src}
              download
              className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-neutral-900 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]"
              aria-label="Download image"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-white/95 p-2 text-neutral-900 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
