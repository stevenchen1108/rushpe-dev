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


import './corporate-page.css';

export default function Corporate() {
    return (
        <>
            <section className="flex flex-col gap-3 justify-center items-center text-center bg-white text-black sm:p-12">
                <h1 className="text-4xl p-4 sm:text-6xl font-semibold tracking-wide">SHPE National Convention 2025</h1>
                <div className="relative flex flex-row h-96 max-w-full">
                    <img className="h-full object-contain" src={nationalConventionLogo.src} />
                    <img className="h-full object-contain" src={groupPhoto.src} />
                </div>
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