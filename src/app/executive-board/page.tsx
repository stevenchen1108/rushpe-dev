import Image from 'next/image';
import shpetinasHeadshot from '../../../public/executive-board-24_25/madeleyn-andrade.png';
import communityHeadshot from '../../../public/executive-board-24_25/daniel-gonzalez.jpeg';
import webmasterHeadshot from '../../../public/executive-board-24_25/david-fabian.jpg';
import academicHeadshot from '../../../public/executive-board-24_25/francisco-aguirre-ponce.jpg';
import fundraisingHeadshot from '../../../public/executive-board-24_25/jose-santiago-barragan.jpg';
import activitiesHeadshot from '../../../public/executive-board-24_25/juan-jose-flechas-latorre.jpeg';
import publicityHeadshot from '../../../public/executive-board-24_25/keren-pimentel-olivares.jpeg';
import secretaryHeadshot from '../../../public/executive-board-24_25/kerly-borbor.jpeg';
import internalVpHeadshot from '../../../public/executive-board-24_25/leandra-castillo.jpg';
import treasurerHeadshot from '../../../public/executive-board-24_25/luke-domingo.png';
import presidentHeadshot from '../../../public/executive-board-24_25/matteo-balderas.jpg';
import externalVpHeadshot from '../../../public/executive-board-24_25/mauricio-ortega.jpg';
import collegiateHeadshot from '../../../public/executive-board-24_25/michael.jpg';
import historianHeadshot from '../../../public/executive-board-24_25/nathaly.jpeg';
import outreachHeadshot from '../../../public/executive-board-24_25/ryan-muriel.jpeg';
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import './executive-board.css';

export default function ExecutiveBoard() {
    const eBoard = [
        {
            position: 'President',
            name: 'Matteo Balderas',
            headshot: presidentHeadshot,
            email: 'president@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/matteo-balderas-a5a353237',
            desc: null,
            index: 0
        }, {
            position: 'External Vice President',
            name: 'Mauricio Ortega',
            headshot: externalVpHeadshot,
            email: 'externalvp@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/mauricio-ortega-93b994288',
            desc: null,
            index: 1
        }, {
            position: 'Internal Vice President',
            name: 'Leandra Castillo',
            headshot: internalVpHeadshot,
            email: 'internalnp@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/leandra-castillo-29a496253',
            desc: null,
            index: 2
        }, {
            position: 'Secretary',
            name: 'Kerly Borbor',
            headshot: secretaryHeadshot,
            email: 'secretary@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/kerlyborbor',
            desc: null,
            index: 3
        }, {
            position: 'Treasurer',
            name: 'Luke Domingo',
            headshot: treasurerHeadshot,
            email: 'treasurer@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/luke-domingo-6a6750253',
            desc: null,
            index: 4
        }, {
            position: 'Public Relations',
            name: 'Keren Pimentel Olivares',
            headshot: publicityHeadshot,
            email: 'publicity@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/rutgers-university-shpe-686bba295',
            desc: null,
            index: 5
        }, {
            position: 'Academic Chair',
            name: 'Francisco Aguirre Ponce',
            headshot: academicHeadshot,
            email: 'academics@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/francisco-ap',
            desc: null,
            index: 6
        }, {
            position: 'Activities Chair',
            name: 'Juan Jose Flechas Latorre',
            headshot: activitiesHeadshot,
            email: 'activities@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/juan-flechas',
            desc: null,
            index: 7
        }, {
            position: 'Community Service',
            name: 'Daniel Gonzalez',
            headshot: communityHeadshot,
            email: 'community@rushpe.org',
            linkedin: "https://www.linkedin.com/in/daniel-gonzalez-7337b0252/",
            desc: "I am a Junior majoring in Chemical Engineering and working towards a certificate in Packaging Engineering. I am the Community Service Chair this year for Rutgers SHPE and am looking forward to the year's events. On campus I am also a SoE Ambassador, a Learning Assistant, and a First Year Integration Leader.",
            index: 8
        },
        {
            position: 'SHPEtinas Chair',
            name: "Madeleyn Andrade-Cajamarca",
            headshot: shpetinasHeadshot,
            email: 'shpetinas@rushpe.org',
            linkedin: "https://www.linkedin.com/in/madeleyn-andrade-71101a1b0",
            desc: "Hi there! I'm Madeleyn. A little bit about me, I grew up in Ecuador and moved to the US a few years ago. I'm currently pursuing my Bachelor's degree in Mechanical Engineering and I'm always looking for opportunities to explore the world out there and give back to the community that has welcomed me!",
            index: 9
        },
        {
            position: 'Webmaster',
            name: 'David Fabian',
            headshot: webmasterHeadshot,
            email: 'webmaster@rushpe.org',
            linkedin: "https://www.linkedin.com/in/david-a-fabian/",
            desc: "I am currently a senior studying computer science in Rutgers University. I've had previous leadership roles that helped me transition into this position, as well as experience with web development. I enjoy biking, cooking, and spending time with friends.",
            index: 9
        }, {
            position: 'Outreach Chair',
            name: 'Ryan Muriel',
            headshot: outreachHeadshot,
            email: 'outreach@rushpe.org',
            linkedin: "https://www.linkedin.com/in/ryanmuriel",
            desc: "I am a sophomore, Ecuadorian, and studying Electrical and Computer Engineer.",
            index: 10
        }, {
            position: 'Collegiate Chair',
            name: 'Michael Cardenas',
            headshot: collegiateHeadshot,
            email: 'collegiate@rushpe.org',
            linkedin: "https://www.linkedin.com/in/michaelc1252",
            desc: "As an Electrical and Computer Engineering student, I am committed to delivering high quality work and continuously supporting my SHPE chapter. With experience in IT Support and leadership skills gained from previous roles, I am excited to welcome incoming freshmen and promote collegiate-level events in my role as this year's Collegiate Chair.",
            index: 11
        }, {
            position: 'Fundraising Chair',
            name: 'Jose Santiago Barragan',
            headshot: fundraisingHeadshot,
            email: 'fundraising@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/josesantiagob',
            desc: "I am a Sophomore Majoring in Electrical Engineering and working towards a minor in Computer Science. This year, I am the Fundraising Chair for the chapter. I got involved with SHE during my freshmen year and got the opportunity to be part of the Community Service Committee. I enjoy going to the gym, playing soccer, and exploring new cities for fun!",
            index: 12
        }, {
            position: 'Historian',
            name: 'Nathaly Alpapucho',
            headshot: historianHeadshot,
            email: 'historian@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/nathaly-a16alp',
            desc: null,
            index: 13
        },
    ];
    return (
        <>
            <section className="flex flex-col justify-center items-center text-center p-4 bg-white text-black sm:p-12">
                <h1 className="text-5xl p-4 sm:text-6xl font-semibold tracking-wider">Executive Board 2024-2025</h1>
                <p className="text-lg lg:w-2/3">
                SHPE Mission Statement: <br/>SHPE changes lives by empowering the Hispanic
                community to realize its fullest potential and to impact the world through
                STEM awareness, access, support, and development.
                </p>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-12 py-10 bg-white text-black">
                {
                    eBoard.map((member) => {
                        return (
                            <div key={member.index} className="relative">
                                <div className="relative size-[87vmin] sm:size-96 outline-black rounded-2xl overflow-hidden outline-double outline-8">
                                    <Image src={member.headshot} alt={member.position + " headshot"}
                                    fill placeholder="blur" className="headshot object-cover"></Image>
                                    <p className={"desc p-8 text-center text-lg" + (member.desc ? "" : " hidden")}>{member.desc}</p>
                                </div>
                                <div className="absolute grid e-board justify-items-end items-center bg-white shadow-lg -right-5 -bottom-5 text-2xl text-right">
                                    <h1 className="text-xl px-2">{member.name}</h1>
                                    <a className="px-2 hover:bg-slate-200" href={member.linkedin}><FaLinkedinIn /></a>
                                    <p className="text-lg font-bold px-2">{member.position}</p>
                                    <a className="px-2 hover:bg-slate-200" href={'mailto:' + member.email}><MdOutlineMail /></a>
                                </div>
                            </div>
                        );
                    })
                }
            </section>
        </>
    );
}