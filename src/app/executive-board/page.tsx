import Image from 'next/image';
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
            linkedin: '',
            desc: '',
            index: 0
        }, {
            position: 'External Vice President',
            name: 'Mauricio Ortega',
            headshot: externalVpHeadshot,
            email: 'externalvp@rushpe.org',
            linkedin: '',
            desc: '',
            index: 1
        }, {
            position: 'Internal Vice President',
            name: 'Leandra Castillo',
            headshot: internalVpHeadshot,
            email: 'internalnp@rushpe.org',
            linkedin: '',
            desc: '',
            index: 2
        }, {
            position: 'Secretary',
            name: 'Kerly Borbor',
            headshot: secretaryHeadshot,
            email: 'secretary@rushpe.org',
            linkedin: '',
            desc: '',
            index: 3
        }, {
            position: 'Treasurer',
            name: 'Luke Domingo',
            headshot: treasurerHeadshot,
            email: 'treasurer@rushpe.org',
            linkedin: '',
            desc: '',
            index: 4
        }, {
            position: 'Public Relations',
            name: 'Keren Pimentel Olivares',
            headshot: publicityHeadshot,
            email: 'publicity@rushpe.org',
            linkedin: '',
            desc: '',
            index: 5
        }, {
            position: 'Academic Chair',
            name: 'Francisco Aguirre Ponce',
            headshot: academicHeadshot,
            email: 'academics@rushpe.org',
            linkedin: '',
            desc: '',
            index: 6
        }, {
            position: 'Activities Chair',
            name: 'Juan Jose Flechas Latorre',
            headshot: activitiesHeadshot,
            email: 'activities@rushpe.org',
            linkedin: '',
            desc: '',
            index: 7
        }, {
            position: 'Community Service',
            name: 'Daniel Gonzalez',
            headshot: communityHeadshot,
            email: 'community@rushpe.org',
            linkedin: '',
            desc: '',
            index: 8
        }, {
            position: 'Webmaster',
            name: 'David Fabian',
            headshot: webmasterHeadshot,
            email: 'webmaster@rushpe.org',
            linkedin: '',
            desc: '',
            index: 9
        }, {
            position: 'Outreach Chair',
            name: 'Ryan Muriel',
            headshot: outreachHeadshot,
            email: 'outreach@rushpe.org',
            linkedin: '',
            desc: '',
            index: 10
        }, {
            position: 'Collegiate Chair',
            name: 'Michael Cardenas',
            headshot: collegiateHeadshot,
            email: 'collegiate@rushpe.org',
            linkedin: '',
            desc: '',
            index: 11
        }, {
            position: 'Fundraising Chair',
            name: 'Jose Santiago Barragan',
            headshot: fundraisingHeadshot,
            email: 'fundraising@rushpe.org',
            linkedin: '',
            desc: '',
            index: 12
        }, {
            position: 'Historian',
            name: 'Nathaly Alpapucho',
            headshot: historianHeadshot,
            email: 'historian@rushpe.org',
            linkedin: '',
            desc: '',
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
                            <div key={member.index} className="relative size-[87vmin] sm:size-96 outline-double outline-8 outline-black rounded-2xl">
                                <Image src={member.headshot} alt={member.position + " headshot"}
                                fill placeholder="blur" className="object-cover rounded-2xl"></Image>
                                <div className="absolute grid e-board justify-items-end items-center bg-white shadow-lg p-2 -right-5 -bottom-5 text-2xl text-right">
                                    <h1 className="text-xl pr-2">{member.name}</h1>
                                    <FaLinkedinIn />
                                    <p className="text-lg font-bold pr-2">{member.position}</p>
                                    <MdOutlineMail />
                                </div>
                            </div>
                        );
                    })
                }
            </section>
        </>
    );
}