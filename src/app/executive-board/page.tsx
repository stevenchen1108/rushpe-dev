'use client'
import Image from 'next/image';
import shpetinasHeadshot from '@/../public/executive-board-24_25/Ana-Maria-Moreno.jpeg';
import communityHeadshot from '@/../public/executive-board-24_25/ricardo-rodriguez.jpg';
import webmasterHeadshot from '@/../public/executive-board-24_25/steven-chen.jpg';
import academicHeadshot from '@/../public/executive-board-24_25/axel-pillacela.jpg';
import fundraisingHeadshot from '@/../public/executive-board-24_25/kevin-arruda.jpeg';
import activitiesHeadshot from '@/../public/executive-board-24_25/michael-schmidt.jpeg';
import publicityHeadshot from '@/../public/executive-board-24_25/genesis-nieto.jpg';
import secretaryHeadshot from '@/../public/executive-board-24_25/ryan-muriel.jpeg';
import internalVpHeadshot from '@/../public/executive-board-24_25/michael.jpg';
import treasurerHeadshot from '@/../public/executive-board-24_25/edwin-espin.jpg';
import presidentHeadshot from '@/../public/executive-board-24_25/nathaly.jpeg';
import externalVpHeadshot from '@/../public/executive-board-24_25/daniel-gonzalez.jpeg';
import collegiateHeadshot from '@/../public/executive-board-24_25/daniela-reyes.jpeg';
import historianHeadshot from '@/../public/executive-board-24_25/Fabiana-Angulo-La-Rosa.jpeg';
import outreachHeadshot from '@/../public/executive-board-24_25/kevin-pena.jpg';
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md"; 
import './executive-board.css';

export default function ExecutiveBoard() {
    const eBoard = [
        {
            position: 'President',
            name: 'Nathaly Alpapucho',
            headshot: presidentHeadshot,
            email: 'president@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/nathaly-a16alp/',
            desc: "I’m a first-generation student who graduated as an Industrial Systems Engineer in Spring '25 and currently working towards my Masters. I'm a proud Ecuadorian who loves to mentor the youth. If I’m not at the PRCC with my SHE familia or doing events as an Engineering Ambassador, you’ll probably find me editing videos, taking pictures, talking to my cats or learning to swim.",
            index: 0
        }, {
            position: 'External Vice President',
            name: 'Daniel Gonzalez',
            headshot: externalVpHeadshot,
            email: 'externalvp@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/daniel-gonzalez-7337b0252/',
            desc: "I am a Senior majoring in Chemical Engineering and working towards a certificate in Packaging Engineering. I am the External Vice President this year for Rutgers SHPE and am looking forward to the year's events. On campus I am also a SoE Ambassador, a Learning Assistant, and a First Year Integration Leader.",
            index: 1
        }, {
            position: 'Internal Vice President',
            name: 'Michael Cardenas',
            headshot: internalVpHeadshot,
            email: 'internalnp@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/michaelc1252',
            desc: "As an Electrical and Computer Engineering student, I am committed to delivering high quality work and continuously supporting my SHPE chapter. With experience in IT Support and leadership skills gained from previous roles, I am excited to prepare everyone for the National SHPE convention and work on the Multicultural festival in my role as this year's Internal Vice President.",
            index: 2
        }, {
            position: 'Secretary',
            name: 'Ryan Muriel',
            headshot: secretaryHeadshot,
            email: 'secretary@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/kerlyborbor',
            desc: "I am a Junior studying Computer Engineering and I am excited to be this year's Secretary. I love playing billiard pool in my free time.",
            index: 3
        }, {
            position: 'Treasurer',
            name: 'Edwin Espin',
            headshot: treasurerHeadshot,
            email: 'treasurer@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/edwinespin',
            desc: "My name is Edwin Espin. I am majoring in Electrical and Computer Engineering. I am an Ecuadorian Colombian first generation student. A fun fact about me is I like to train martial arts and dance for fun. I also am the middle of seven kids!",
            index: 4
        }, {
            position: 'Public Relations',
            name: 'Genesis Martinez Nieto',
            headshot: publicityHeadshot,
            email: 'publicity@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/genesis-martinez-nieto',
            desc: "Hi! My name is Genesis, I'm a sophomore studying Biomedical Engineering. I'm a proud Mexican-American and first-generation college student. This year, I'm excited to be SHE’s Publicity Chair and serve the community that’s given me so much. Outside of class, I like to spend my time crocheting, playing tennis, or learning to dance!",
            index: 5
        }, {
            position: 'Academic Chair',
            name: 'Axel Pillacela',
            headshot: academicHeadshot,
            email: 'academics@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/axel-pillacela-8483ab243',
            desc: "My name is Axel Pillacela, a current junior studying Computer Engineering. After hearing about SHE through the EOF program, I knew I had to check it out if I wanted to see people like me on campus. I was able to grow a lot in just one year with SHE, and I’m excited to work with everyone this year as your Academic Excellence Chair!",
            index: 6
        }, {
            position: 'Activities Chair',
            name: 'Michael Schmidt',
            headshot: activitiesHeadshot,
            email: 'activities@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/michael-schmidt-9a7272328',
            desc: "I am a Sophomore studying Industrial and Systems Engineering. Not only am I an active representative for the Society of Hispanic Engineers but also partakes in the Rutgers Unión Estudiantil Puertorriqueña. When I am not studying or in class, I am an active gymgoer and writer.",
            index: 7
        }, {
            position: 'Community Service',
            name: 'Ricardo Rodriguez',
            headshot: communityHeadshot,
            email: 'community@rushpe.org',
            linkedin: "https://www.linkedin.com/in/ricardo-rodriguez06",
            desc: "My name is Ricardo Rodriguez, I am majoring in mechanical engineering, and I like to play instruments and sing.",
            index: 8
        },
        {
            position: 'SHPEtinas Chair',
            name: "Ana-Maria Moreno",
            headshot: shpetinasHeadshot,
            email: 'shpetinas@rushpe.org',
            linkedin: "https://www.linkedin.com/in/anamariacmoreno?",
            desc: "Hello, my name is Ana and I am a studying Industrial and Systems Engineering. I am this years SHPEtinas Chair and am looking forward to giving back to the community that has helped me through both personal and professional growth! I love to travel, go swimming, and crocheting.",
            index: 9
        },
        {
            position: 'Webmaster',
            name: 'Steven Chen',
            headshot: webmasterHeadshot,
            email: 'webmaster@rushpe.org',
            linkedin: "https://www.linkedin.com/in/steven-chen-0193ba295/",
            desc: "Hi! My name is Steven Chen and I’m currently a junior studying Computer Science. I’m excited to be part of SHPE and look forward to using technology to uplift underrepresented communities and inspire the next generation of innovators. I enjoy running, hiking, and eating food.",
            index: 9
        }, {
            position: 'Outreach Chair',
            name: 'Kevin Pena',
            headshot: outreachHeadshot,
            email: 'outreach@rushpe.org',
            linkedin: "www.linkedin.com/in/kevin-pena-583490291",
            desc: "My name is Kevin Pena, a senior majoring in Mechanical Engineering with a concentration in Energy. As this year's Outreach chair, I am committed to my mission of inspiring the next generation of minority students in STEM. In my free time, I enjoy playing soccer, listening to music, and snowboarding.",
            index: 10
        }, {
            position: 'Collegiate Chair',
            name: 'Daniela Reyes',
            headshot: collegiateHeadshot,
            email: 'collegiate@rushpe.org',
            linkedin: "https://www.linkedin.com/in/daniela-reyes-194318336",
            desc: "Hi! I'm Daniela Reyes, a sophomore majoring in electrical engineering. In my free time, I enjoy running! It helps clear my mind and stay balanced during busy semesters. I just completed my first half marathon in April 2025 and I'm currently training for a full marathon in 2026.",
            index: 11
        }, {
            position: 'Fundraising Chair',
            name: 'Kevin Arruda',
            headshot: fundraisingHeadshot,
            email: 'fundraising@rushpe.org',
            linkedin: 'https://www.linkedin.com/in/kevin-arruda',
            desc: "I am currently a senior studying Mechanical Engineering, with a concentration in energy. I hope to leverage my internship experiences and work with other member to lead a successful fundraising campaign. In addition, I am also Co-Founding an engineering club focusing on competing an electric boat.",
            index: 12
        }, {
            position: 'Historian',
            name: 'Fabiana Angulo',
            headshot: historianHeadshot,
            email: 'historian@rushpe.org',
            linkedin: 'http://linkedin.com/in/fabiana-angulo2000',
            desc: 'Hi, my name is Fabiana Angulo, and I’m currently studying Biomedical Engineering. I was born and raised in Peru.',
            index: 13
        },
    ];

    const [showLegacy, updateLegacyDropdown] = useState(false);

    const updateDropDown = function () {
        console.log("printing");
        if (showLegacy) {
            return {
                maxWidth: "auto",
            };
        }
        return {
                maxWidth: "0",
            };
    };

    return (
        <>
            <section className="flex flex-col justify-center items-center text-center p-4 bg-white text-black sm:p-12">
                <h1 className="text-5xl p-4 sm:text-6xl font-semibold tracking-wider">Executive Board 2025-2026</h1>
                <p className="text-lg lg:w-2/3">
                SHPE Mission Statement: <br/>SHPE changes lives by empowering the Hispanic
                community to realize its fullest potential and to impact the world through
                STEM awareness, access, support, and development.
                </p>
            </section>
            <section className="flex flex-wrap justify-around justify-items-center gap-12 py-10 bg-white text-black">
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
                                    <a className="px-2 hover:bg-slate-200" target = "_blank" href={member.linkedin}><FaLinkedinIn /></a>
                                    <p className="text-lg font-bold px-2">{member.position}</p>
                                    <a className="px-2 hover:bg-slate-200" href={'mailto:' + member.email}><MdOutlineMail /></a>
                                </div>
                            </div>
                        );
                    })
                }
            </section>
            <motion.div
                onClick={ () => { updateLegacyDropdown(!showLegacy) } }
                layout
                style={ updateDropDown() }
                >Click Here!</motion.div>
        </>
    );
}

