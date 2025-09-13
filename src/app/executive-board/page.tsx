'use client'
import Image from 'next/image';
import { eBoardData2024, eBoardData2025 } from './eboard-data';
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md"; 
import { motion } from 'framer-motion';
import { useState } from 'react';
import './executive-board.css';

export default function ExecutiveBoard() {
    const currExecutiveBoard = eBoardData2025;

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
                    currExecutiveBoard.map((member) => {
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
            {/* <motion.div
                onClick={ () => { updateLegacyDropdown(!showLegacy) } }
                layout
                style={ updateDropDown() }
                >Click Here!</motion.div> */}
        </>
    );
}

