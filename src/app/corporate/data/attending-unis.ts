import type { LogoLink } from './types';
import {
  binghamtonLogo,
  cornellTechLogo,
  lehighLogo,
  njitLogo,
  nyitLogo,
  nyuTandonLogo,
  setonHallLogo,
  stevensLogo,
} from './logos';

export const ATTENDING_UNIS: LogoLink[] = [
  {
    name: 'Binghamton University',
    href: 'https://www.binghamton.edu/',
    logo: binghamtonLogo,
  },
  {
    name: 'Cornell Tech',
    href: 'https://tech.cornell.edu/',
    logo: cornellTechLogo,
  },
  {
    name: 'Lehigh University - P.C. Rossin College of Engineering',
    href: 'https://engineering.lehigh.edu/',
    logo: lehighLogo,
  },
  {
    name: 'New Jersey Institute of Technology (NJIT)',
    href: 'https://www.njit.edu/',
    logo: njitLogo,
  },
  {
    name: 'New York Institute of Technology',
    href: 'https://www.nyit.edu/',
    logo: nyitLogo,
  },
  {
    name: 'NYU Tandon School of Engineering',
    href: 'https://engineering.nyu.edu/',
    logo: nyuTandonLogo,
  },
  {
    name: 'Seton Hall University',
    href: 'https://www.shu.edu/',
    logo: setonHallLogo,
  },
  {
    name: 'Stevens Institute of Technology',
    href: 'https://www.stevens.edu/',
    logo: stevensLogo,
  },
];