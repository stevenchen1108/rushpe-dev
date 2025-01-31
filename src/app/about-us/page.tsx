import Image from 'next/image';
import Link from 'next/link';
import faceOffImg from '@/../public/about-pg-assets/about-us-bg.jpg'
import gbmBuildImg from '@/../public/about-pg-assets/about-us-image.png'
import pillarsGphc from '@/../public/about-pg-assets/pillars-graphic.png'
import { FaRegFilePdf } from "react-icons/fa";

export default function AboutUs() {
    return (
        <>
            <section className="relative pt-16 sm:p-16">
                <Image
                src={faceOffImg} alt='club face off'
                placeholder='blur' fill
                className="object-cover"
                ></Image>
                <div className="relative flex flex-col basis-0 items-center sm:flex-row bg-white/80 text-black text-lg">
                    <div className="p-4">
                        <h1 className="text-3xl font-bold py-3">About Us</h1>
                        <p><b>The Society of Hispanic Engineers</b> (SHE) is the Rutgers University student chapter
                            of the Society of Hispanic Professional Engineers (SHPE). The Society of Hispanic
                            Engineers at Rutgers University was founded in 1984 by seven Hispanic engineering
                            students. They saw the need for an organization where Hispanic engineering students
                            could meet to address their cultural concerns. The society was founded with the
                            motto “<b>Recruit, Retain, and Graduate minority students majoring in engineering,
                            math, or science.</b>” Initially, SHE was established independently from SHPE. In 1988
                            SHE became a recognized chapter of SHPE.</p>
                    </div>
                    <div className='block relative min-h-80 grow w-full sm:min-w-56'>
                        <Image
                        src={gbmBuildImg} alt='she members building a structure'
                        placeholder='blur' fill
                        className="object-cover"
                        ></Image>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-8 bg-white text-black
            text-3xl font-bold tracking-wide p-6">
                <h1>View Our Consitution Here</h1>
                <Link href="https://86a86efc-320b-46b2-94e8-dd1980d85076.filesusr.com/ugd/65eba6_e140d782f90b4d95b50de77266162ca7.pdf"
                    className="text-7xl">
                    <FaRegFilePdf/>
                </Link>
                <div className="relative w-full">
                    <Image
                    src={pillarsGphc} alt='pillars of she'
                    placeholder='blur' width={2000} height={800}
                    className="object-cover"
                    ></Image>
                </div>
            </section>
        </>
    );
}