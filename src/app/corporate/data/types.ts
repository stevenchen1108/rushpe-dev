export type Company = {
  name: string;
  href: string;
  logo?: any;              // StaticImageData
  textFallback?: string;
  logoClassName?: string;
};

export type SponsorTiers = {
  platinum: Company[];
  gold: Company[];
  silver: Company[];
  bronze: Company[];
};

export type LogoLink = {
  name: string;
  href: string;            // external link (opens new tab)
  logo: any;               // StaticImageData
};

export type Organizer = {
  name: string;
  href: string;
  logo: any;
  cta: string;
};
