import ResourceComponent from '@/components/resources-shpetinas.component';
import EventsComponent from '@/components/events-shpetinas.component';
import Image from 'next/image';
import shpetinasBanner1 from '@/../public/shpetinas/shpetinas-banner1.jpg';
import shpetinasBanner2 from '@/../public/shpetinas/shpetinas-banner2.jpg';
import shpetinasPhoto1 from '@/../public/shpetinas/shpetinas-commitee.jpeg';
import shpetinasPhoto2 from '@/../public/shpetinas/shpetinas-at-convention1.jpg';
import shpetinasPhoto3 from '@/../public/shpetinas/shpetinas-at-convention2.jpg';

export default function Shpetinas () {
    return (
        <>
            <section className="bg-[#ffdbf8]">
                <div className="relative h-64 lg:h-96">
                    <Image
                    src={shpetinasBanner1.src}
                    alt="shpetinas banner" fill
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    ></Image>
                </div>
                <div className="flex flex-col bg-[#ffdbf8] text-black py-4 mx-auto">
                    <div className="flex flex-col bg-white rounded-3xl p-5 mb-5 lg:mx-80 md:mx-8 sm:mx-0">
                        <h1 className="text-center font-bold tracking-wide text-5xl mx-auto my-auto">
                            <span className="text-4xl">Welcome to </span>
                            SHPEtinas!</h1>
                    </div>
                    <div className="relative flex flex-row items-center bg-white p-5">
                        <div className="text-lg">
                            <h1 className="text-2xl font-semibold">Who Are We?</h1>
                            <p>SHPEtinas is an initiative and program designed to “<i>accelerate and affirm Latina representation at all levels of STEM corporate and academic leadership.</i>”</p>
                            <p><br/>At Rutgers, the <b>SHPEtinas committee</b> aims to empower ALL women in STEM through mentorship,
                                professional development, and community collaboration.</p>
                        </div>
                        <div className="relative w-full sm:w-[50rem] h-[18rem]">
                            <Image
                            src={shpetinasPhoto1.src}
                            alt="shpetinas committee" fill
                            objectFit="cover"
                            ></Image>
                        </div>
                    </div>
                </div>
                <EventsComponent />
                <ResourceComponent />
            </section>
        </>
    );
}