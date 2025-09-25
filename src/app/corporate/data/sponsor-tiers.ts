import type { SponsorTiers } from './types';
import {
  verizonLogo,
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
} from './logos';

export const SPONSORS: SponsorTiers = {
  platinum: [
    { name: 'Verizon', href: 'https://www.verizon.com/', logo: verizonLogo },
  ],
  gold: [
    
  ],
  silver: [
    { name: 'Bloomberg', href: 'https://www.bloomberg.com/', logo: bloombergLogo, logoClassName: 'mix-blend-multiply' },
    { name: 'Whiting-Turner', href: 'https://www.whiting-turner.com/', logo: whitingturnerLogo },
  ],
  bronze: [
    { name: 'Bank of America', href: 'https://www.bankofamerica.com/', logo: bofaLogo },
  ]
};
