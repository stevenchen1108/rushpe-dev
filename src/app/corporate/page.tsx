import Image from 'next/image';
import ssmImg from '@/../public/she-swe-meet/she-swe-meet-logo.jpeg';
import bloomLogo from '@/../public/she-swe-meet/bloomburg-logo.png';
import whitingLogo from '@/../public/she-swe-meet/wt-logo.png';
import bofaLogo from '@/../public/she-swe-meet/bofa-logo.png';
import verizonLogo from '@/../public/she-swe-meet/verizon-logo.png';
import infiniteumLogo from '@/../public/she-swe-meet/infineum-logo.svg'
import navalLogo from '@/../public/she-swe-meet/naval-nuclear-logo.png';
import nationalConventionLogo from '@/../public/national-convention/shpe-national-convention-2025.webp';
import groupPhoto from '@/../public/national-convention/group-photo-2025.webp';
import ImgBook from '@/components/img-book.component';
import Link from 'next/link';

import './corporate-page.css';

export default function Corporate() {
    return (
        <>
            <section className="flex flex-col gap-3 justify-center items-center text-center bg-white text-black sm:p-12">
            
                <button className = "px-4 py-2 bg-white-500 text-black rounded text-5xl font-semibold">
                    SHPE National Convention 2025
                </button>   
                <div className="relative flex flex-row max-h-80 max-w-full">
                   <div className="max-h-full  w-1/4 object-contain relative" > <img className="object-contain inset-0" src={nationalConventionLogo.src} /></div>
                    <div className="overflow-hidden max-h-full w-2/3 object-contain flex-1 rounded-full relative"> <img className="object-contain inset-0" src={groupPhoto.src} /></div>
                </div>
                <p className="text-lg lg:w-2/3">
                The SHPE National Convention 2025 is taking place from October 29 to November 1 in Philadelphia, Pennsylvania! Join us for one of the largest annual gatherings of top STEM talent where professional development and unparalleled opportunities await.
                At this signature SHPE event, experience inspiring keynotes, engaging workshops, and dynamic networking with industry leaders and organizations. Get ready for exciting competitions and the ever-popular Career Fair featuring over 250 exhibitors!
                This is a life-changing convention where fun, opportunities, and Familia come together. See you in Philly! ✈️
                </p>
                <button className = "px-4 py-2 bg-white-500 text-black rounded text-2xl font-semibold">
                    Learn More
                </button>

            </section>
            <section className="flex flex-col gap-3 justify-center items-center text-center bg-white text-black sm:p-12">
                <h1 className="text-4xl p-4 sm:text-6xl font-semibold tracking-wide">SHE-SWE-MEET Career Fair</h1>
                <div className="relative w-full h-auto sm:w-1/2 sm:h-auto shadow-md sm:rounded-md overflow-hidden">
                    <img src={ssmImg.src} alt="Career fair photo" className="object-cover"></img>
                </div>
                <p className="text-lg lg:w-2/3">
                The SHE-SWE-MEET Engineering and Computer Science Career Fair is an annual event where we partner up with other Rutgers
                engineering minority societies (National Society of Black Engineers and the Society of Women Engineers). This is one of
                the largest student-run career fairs on campus! With over 50 companies and hundreds of students attending the career fair
                seeking corporate opportunities. Please contact our External Vice President at external.vp@rushpe.org for further information.
                </p>
                <div className="flex flex-col items-stretch gap-7 py-5 px-3 lg:w-2/3 rounded-md bg-slate-100 shadow-md">
                    <h1 className="tracking-wide text-xl border-b-2 border-black"><i>Special Thanks To Our Sponsors</i></h1>
                    <h1 className="tracking-wider text-3xl font-bold shiny-platinum">Platinum Sponsors</h1>
                    <div className="self-center relative flex flex-row items-center gap-6 w-5/6">
                        <a href="https://mycareer.verizon.com/">
                            <Image src={verizonLogo} height={2000} alt="verizon logo"></Image>
                        </a>
                        <a href="https://careers.bankofamerica.com/en-us">
                            <Image src={bofaLogo} height={4000} alt="bank of america logo"></Image>
                        </a>
                    </div>
                    <h1 className="tracking-wider text-3xl font-bold text-yellow-500">Gold Sponsor</h1>
                    <div className="self-center justify-center relative flex flex-row items-center gap-6 w-5/6">
                        <a href="https://www.infineum.com/careers/">
                            <Image src={infiniteumLogo} height={200} alt="infiniteum logo"></Image>
                        </a>
                    </div>
                    <h1 className="self-start tracking-wider text-3xl font-bold text-gray-400">Silver Sponsor</h1>
                    <div className="self-center justify-center relative flex flex-row items-center gap-6 w-5/6">
                        <a href="https://navalnuclearlab.energy.gov/careers/">
                            <Image src={navalLogo} height={200} alt="naval nuclear logo"></Image>
                        </a>
                    </div>
                    <h1 className="self-start tracking-wider text-3xl font-bold text-yellow-600">Bronze Sponsors</h1>
                    <div className="self-center relative flex flex-row items-center gap-6 w-5/6">
                        <a href="https://www.whiting-turner.com/careers/">
                            <Image src={whitingLogo} height={2400} alt="whiting turner logo"></Image>
                        </a>
                        <a href="https://www.bloomberg.com/">
                            <Image src={bloomLogo} alt="bloomburg logo"></Image>
                        </a>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center text-center p-4 bg-white text-black sm:p-12">
                <h1 className="text-5xl p-4 sm:text-6xl font-semibold tracking-wider">Corporate Opportunities</h1>
                <p className="text-lg lg:w-2/3">
                We encourage companies to reach out to us especially when it comes to our professional development events.
                Exposing our members to these opportunities is a great way to help students hone their professional development skills.
                </p>
            </section>
        </>
    );
}