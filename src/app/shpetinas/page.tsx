import ResourceComponent from '@/components/resources-shpetinas.component';
import EventsComponent from '@/components/events-shpetinas.component';
import Image from 'next/image';
import shpetinasBanner1 from '@/../public/shpetinas/shpetinas-banner1.jpg';
import shpetinasBanner2 from '@/../public/shpetinas/shpetinas-banner2.jpg';
import shpetinasPhoto1 from '@/../public/shpetinas/shpetinas-commitee.jpeg';
import shpetinasPhoto2 from '@/../public/shpetinas/shpetinas-at-convention1.jpg';
import shpetinasPhoto3 from '@/../public/shpetinas/shpetinas-at-convention2.jpg';
import shapeherPhoto from '@/../public/shpetinas/shapeher-photo.jpg';

export default function Shpetinas () {
    return (
        <>
            <section className="bg-[#ffdbf8] text-black">
                <div className="relative h-40 sm:h-64 lg:h-96">
                    <Image
                    src={shpetinasBanner1.src}
                    alt="shpetinas banner" fill
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    ></Image>
                </div>
                <div className="relative flex flex-col xl:flex-row bg-[#ffdbf8] p-2 sm:p-4 gap-3 justify-center">
                    <div className="xl:w-1/2 bg-[#ffdbf8] xl:bg-white flex flex-col justify-center rounded-3xl p-2">
                        <div className="text-center font-bold tracking-wide text-5xl sm:text-7xl shpetinas-font text-white xl:text-gray-200 leading-[1.3]">
                            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-black">Welcome to </h1>
                            <span className="relative tracking-wider">SHPE
                                <span className="absolute bot-1 right-1 text-yellow-500">SHPE</span>
                            </span>
                            <span className="relative">tinas!
                                <span className="absolute bot-1 right-2 text-pink-700">tinas!</span>
                            </span>
                        </div>
                    </div>
                    <div className="relative flex flex-col sm:flex-row bg-white drop-shadow-lg lg:gap-2">
                        <div className="text-md sm:text-left p-3 sm:p-5">
                            <h1 className="text-xl sm:text-2xl font-semibold py-2">Who Are We?</h1>
                            <p>SHPEtinas is an initiative and program designed to
                                “<i>accelerate and affirm Latina representation at all levels of STEM corporate and academic leadership.</i>"
                            </p>
                            <p><br/>At Rutgers, the <b>SHPEtinas committee</b> aims to empower ALL women in STEM through mentorship,
                                professional development, and community collaboration.
                            </p>
                        </div>
                        <div className="relative w-full min-h-52 sm:min-h-72">
                            <Image
                            src={shpetinasPhoto1.src}
                            alt="shpetinas committee" fill
                            objectFit="cover"
                            ></Image>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col sm:p-4 p-2 gap-1">
                    <div className="relative flex flex-col sm:flex-row items-center bg-white">
                        <h1 className="block sm:hidden text-2xl font-semibold font-mono p-2">SHaPE Her Program</h1>
                        <div className="relative w-full sm:w-[65rem] h-[17rem]">
                            <Image
                            src={shapeherPhoto.src}
                            alt="shape her image" fill
                            objectFit="cover"
                            ></Image>
                        </div>
                        <div className="flex flex-col gap-4 text-md p-3">
                            <h1 className="hidden sm:block text-2xl sm:text-4xl font-semibold font-mono">SHaPE Her Program</h1>
                            <p className="text-md"><b>SHaPE Her</b> an initiative designed to empower women in STEM through mentorship, professional development,
                                and community collaboration. This program aims to bridge the gap between aspiring women engineers and experienced professionals,
                                fostering a strong network of support, guidance, and mutual growth.</p>
                        </div>
                    </div>
                </div>
                <EventsComponent />
                <ResourceComponent />
            </section>
        </>
    );
}