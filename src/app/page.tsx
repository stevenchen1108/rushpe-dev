import Image from 'next/image';
import asImage from '../../public/home-pg-assets/academic-support.jpg';
import isImage from '../../public/home-pg-assets/internship-scholarship.jpg';
import prImage from '../../public/home-pg-assets/professionalism.jpg';
import neImage from '../../public/home-pg-assets/networking.jpg';
import faImage from '../../public/home-pg-assets/fun-activities.jpg';
import vnImage from '../../public/home-pg-assets/volunteering.jpg';

export default function Home() {
  const frontPageLinks = [
    {
      id: 0,
      title: 'Upcoming Events',
      desc: 'View our upcoming events & meetings.'
    }, {
      id: 1,
      title: 'Scholarship Opportunities',
      desc: 'Apply for scholarship and access academic resources.'
    }, {
      id: 2,
      title: 'Professional Resources',
      desc: 'Attend our workshops & expand your network.'
    }, {
      id: 3,
      title: 'Send Us A Message',
      desc: 'Deliver questions, comments, or concerns.'
    },
  ];
  const offeringLinks = [
    {
      id: 0,
      title: 'Academic Support',
      imgName: asImage,
      link: ''
    }, {
      id: 1,
      title: 'Professionalism',
      imgName: prImage,
      link: ''
    }, {
      id: 2,
      title: 'Internship & Scholarship',
      imgName: isImage,
      link: ''
    }, {
      id: 3,
      title: 'Networking',
      imgName: neImage,
      link: ''
    }, {
      id: 4,
      title: 'Fun Activities',
      imgName: faImage,
      link: ''
    }, {
      id: 5,
      title: 'Volunteering',
      imgName: vnImage,
      link: ''
    },
  ]

  return (
    <>
      <div className="relative w-full overflow-x-hidden flex justify-center">
        <video autoPlay={true} muted loop className="min-w-[90rem] m-auto object-contain">
          {/* set to true ^^^ */}
          <source src="/home-pg-assets/home-bg-vid.mp4" type="video/mp4"/>       
        </video>
        <div className="absolute px-16 py-20 top-0 left-0">
          <div className="text-wrap w-[37rem] p-4 bg-black bg-opacity-25">
            <h2 className="text-5xl font-semibold tracking-wide">Welcome to RUSHPE!</h2>
            <p className="text-lg my-3 max-w-[80%]">
              Our Rutgers chapter seeks to foster both academic
              and professional education to further individuals of
              any denomination in all fields of study.
            </p>
          </div>
        </div>
        <div className="absolute m-5 bottom-0 flex justify-center">
          {
            frontPageLinks.map( link => {
              return (
                <div key={link.id} className="bg-white w-56 h-44 p-3 shadow-2xl rounded-md m-2 text-center">
                  <h1 className="my-3 text-black text-2xl font-semibold tracking-wide">
                    {link.title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {link.desc}
                  </p>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="relative overflow-hidden h-[45rem]">
        <div className="absolute flex flex-col align-middle justify-center h-full w-1/2 min-w-[35rem] z-10 p-24 bg-black bg-opacity-30 right-0">
          <h1 className="tracking-wider font-bold text-6xl">Our Mission</h1>
          <p className="my-5">&quot;Recruit, retain, and graduate minority students majoring in engineering,
            math, and science.&quot;</p>
          <p className="font-semibold">You do not have to be Hispanic to join. We accept everyone</p>
        </div>
        <Image
        src="/home-pg-assets/our-mission-bg.jpg"
        placeholder="blur"
        blurDataURL="/home-pg-assets/our-mission-bg.jpg"
        alt="our mission" fill
        sizes="(max-width: 768px) 100vw"
        objectFit="cover"
        ></Image>
      </div>
      <div className="relative min-w-72 py-4">
        <h1 className='w-full text-5xl tracking-wide font-semibold text-center'>
          We Offer
        </h1>
        <div className="flex flex-wrap align-middle justify-center">
          {
            offeringLinks.map( offerItem => {
              return (
                <div key={offerItem.id} className="relative h-[22rem] w-72 m-5">
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
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
