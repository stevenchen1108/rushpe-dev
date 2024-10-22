import Image from 'next/image';
import ssmImg from '../../../public/she-swe-meet/she-swe-meet-logo.jpeg';
import bloomLogo from '../../../public/she-swe-meet/bloomburg-logo.png';

export default function Corporate() {
    return (
        <>
            <section className="flex flex-col gap-3 justify-center items-center text-center bg-white text-black sm:p-12">
                <h1 className="text-4xl p-4 sm:text-6xl font-semibold tracking-wide">SHE-SWE-MEET Career Fair</h1>
                <div className="relative w-full h-auto sm:w-1/2 sm:h-auto shadow-md sm:rounded-md overflow-hidden">
                    <Image src={ssmImg} alt="Career fair photo"
                    placeholder="blur" className="object-cover"></Image>
                </div>
                <p className="text-lg lg:w-2/3">
                The SHE-SWE-MEET Engineering and Computer Science Career Fair is an annual event where we partner up with other Rutgers
                engineering minority societies (National Society of Black Engineers and the Society of Women Engineers). This is one of
                the largest student-run career fairs on campus! With over 50 companies and hundreds of students attending the career fair
                seeking corporate opportunities. Please contact our External Vice President at external.vp@rushpe.org for further information.
                </p>
                <div className="flex flex-col items-stretch gap-3 py-5 px-3 lg:w-2/3 rounded-md bg-slate-100 shadow-md">
                    <h1 className="tracking-wide text-xl border-b-2 border-black"><i>Special Thanks To Our Sponsors</i></h1>
                    <h1 className="self-start tracking-wider text-3xl font-bold text-yellow-600">Bronze Sponsor</h1>
                    <div className="self-center relative w-1/2">
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