'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
} from './logos';

/** Edit this list to control what shows in the marquee (order = left→right). */
export const MARQUEE_LOGOS: (StaticImageData | string)[] = [
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
];

/** Seconds to scroll one logo sequence. Lower = faster, higher = slower. */
export const MARQUEE_SPEED_SEC = 22;

type Props = {
  logos?: (StaticImageData | string)[];
  speedSec?: number;
  className?: string;
};

/** Repeat whole sequences to cover the viewport throughout a seamless loop. */
export function LogoMarquee({
  logos = MARQUEE_LOGOS,
  speedSec = MARQUEE_SPEED_SEC,
  className = '',
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const sequence = sequenceRef.current;
    if (!viewport || !sequence) return;

    const updateCopies = () => {
      const sequenceWidth = sequence.getBoundingClientRect().width;
      if (!sequenceWidth) return;
      // One extra sequence replaces the one scrolling out of view.
      setCopies(Math.max(2, Math.ceil(viewport.clientWidth / sequenceWidth) + 1));
    };

    updateCopies();
    const observer = new ResizeObserver(updateCopies);
    observer.observe(viewport);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, [logos]);

  if (!logos.length) return null;

  return (
    <div ref={viewportRef} className={`marquee-mask ${className}`}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speedSec}s`,
          '--marquee-copies': copies,
        } as CSSProperties}
      >
        {Array.from({ length: copies }, (_, copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? sequenceRef : undefined}
            className="marquee-group"
            aria-label={copy === 0 ? 'Sponsors' : undefined}
            aria-hidden={copy > 0 ? true : undefined}
          >
            {logos.map((logo, i) => (
              <li key={i} className="marquee-item">
                <Image
                  src={logo}
                  alt={copy === 0 ? 'sponsor logo' : ''}
                  className="h-8 w-auto object-contain opacity-80"
                  priority
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
