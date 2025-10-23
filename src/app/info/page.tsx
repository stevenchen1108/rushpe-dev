// app/info/page.tsx
import Image from "next/image";
import Link from "next/link";

type Offering = { id: number; title: string; imgSrc: string; link: string };

export default function InfoHub() {
  const offeringLinks: Offering[] = [
    { id: 0, title: "Academic Support", imgSrc: "/home-pg-assets/academic-support.jpg", link: "info/academics" },
    { id: 1, title: "Professionalism", imgSrc: "/home-pg-assets/professionalism.jpg", link: "info/professionalism" },
    { id: 2, title: "Internship & Scholarship", imgSrc: "/home-pg-assets/internship-scholarship.jpg", link: "corporate" },
    { id: 3, title: "Networking", imgSrc: "/home-pg-assets/networking.jpg", link: "info/networking" },
    { id: 4, title: "Fun Activities", imgSrc: "/home-pg-assets/fun-activities.jpg", link: "events" },
    { id: 5, title: "Volunteering", imgSrc: "/home-pg-assets/volunteering.jpg", link: "events" },
  ];

  return (
    <div className="flex flex-wrap align-middle justify-center sm:gap-5 overflow-clip">
      {offeringLinks.map((offer) => (
        <div key={offer.id} className="block grow md:grow-0 relative h-[28rem] md:h-[22rem] w-72 hover:scale-105 transition-all">
          <Link href={`/${offer.link}`}>
            <Image
              src={offer.imgSrc}
              alt={offer.title}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover"
              priority={offer.id === 0}
            />
            <div className="absolute inset-0 flex flex-col justify-end">
              <h1 className="text-3xl font-semibold text-center my-auto">{offer.title.toUpperCase()}</h1>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
