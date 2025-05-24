import Image from 'next/image';
import shpetinasKickoffPhoto1 from '@/../public/shpetinas/kickoff-event-photo1.jpg';
import shpetinasKickoffPhoto2 from '@/../public/shpetinas/kickoff-event-photo2.jpg';

export default function ShapeHer() {
    return (
        <>
            <section className="bg-[#ffddcf] text-black">
                <div className="relative flex flex-col justify-center items-center h-40 sm:h-64 lg:h-96">
                    <Image
                    src={shpetinasKickoffPhoto2.src}
                    alt="shpetinas banner" fill
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    ></Image>
                    <h1>SHaPE Her Mentorship Program</h1>
                </div>
                <div className="relative flex flex-col sm:flex-row">
                    <div className="bg-white"></div>
                    <div className="relative h-20 sm:h-40 lg:h-64">
                        <Image
                        src={shpetinasKickoffPhoto2.src}
                        alt="shpetinas logo" fill
                        sizes="(max-width: 768px) 100vw"
                        objectFit="cover"
                        ></Image>
                    </div>
                </div>
            </section>
        </>
    );
}