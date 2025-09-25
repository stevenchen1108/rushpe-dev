'use client';

import Image, { type StaticImageData } from 'next/image';
import {
  verizonLogo,
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
} from './logos';

/** Edit this list to control what shows in the marquee (order = left→right). */
export const MARQUEE_LOGOS: (StaticImageData | string)[] = [
  verizonLogo,
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
];

/** Seconds for one full loop. Lower = faster, higher = slower. */
export const MARQUEE_SPEED_SEC = 22;

type Props = {
  logos?: (StaticImageData | string)[];
  speedSec?: number;
  className?: string;
};

/**
 * Lightweight, looped logo marquee.
 * Uses your existing CSS utilities:
 *  - .marquee-mask
 *  - .marquee-track (animation-duration is set inline)
 *  - .marquee-item
 */
export function LogoMarquee({
  logos = MARQUEE_LOGOS,
  speedSec = MARQUEE_SPEED_SEC,
  className = '',
}: Props) {
  // duplicate to make the loop seamless
  const loop = [...logos, ...logos];

  return (
    <div className={`marquee-mask ${className}`}>
      <ul className="marquee-track" style={{ animationDuration: `${speedSec}s` }}>
        {loop.map((logo, i) => (
          <li key={i} className="marquee-item">
            <Image
              src={logo}
              alt="sponsor logo"
              className="h-8 w-auto object-contain opacity-80"
              priority={i < 6}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}