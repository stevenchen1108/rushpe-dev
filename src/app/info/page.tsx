import Image from 'next/image';
import Link from 'next/link';
import asImage from '@/../public/home-pg-assets/academic-support.jpg';
import isImage from '@/../public/home-pg-assets/internship-scholarship.jpg';
import prImage from '@/../public/home-pg-assets/professionalism.jpg';
import neImage from '@/../public/home-pg-assets/networking.jpg';
import faImage from '@/../public/home-pg-assets/fun-activities.jpg';
import vnImage from '@/../public/home-pg-assets/volunteering.jpg';

export default function InfoHub() {

    const offeringLinks = [
        {
          id: 0,
          title: 'Academic Support',
          imgName: asImage,
          link: 'academics'
        }, {
          id: 1,
          title: 'Professionalism',
          imgName: prImage,
          link: 'professionalism'
        }, {
          id: 2,
          title: 'Internship & Scholarship',
          imgName: isImage,
          link: 'corporate'
        }, {
          id: 3,
          title: 'Networking',
          imgName: neImage,
          link: 'networking'
        }, {
          id: 4,
          title: 'Fun Activities',
          imgName: faImage,
          link: 'activities'
        }, {
          id: 5,
          title: 'Volunteering',
          imgName: vnImage,
          link: 'events'
        },
      ];
    
    return (
        <>
            <div className="flex flex-wrap align-middle justify-center sm:gap-5 overflow-clip">
          {
            offeringLinks.map( offerItem => {
              return (
                <div key={offerItem.id} className="block grow md:grow-0 relative h-[28rem] md:h-[22rem] w-72 hover:scale-105 transition-all">
                  <Link href={"/info/" + offerItem.link}>
                    <Image src={offerItem.imgName}
                    placeholder="blur"
                    alt={offerItem.title} fill
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    ></Image>
                    <div className="absolute flex flex-col justify-end align-middle inset-0">
                      <h1 className="text-3xl font-semibold text-center my-auto">
                        {offerItem.title.toUpperCase()}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>
        </>
    );
}