'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';
import { createClient } from "@supabase/supabase-js";
import comicBg from "@/../public/comic-bg.jpg";
import './she-nano-meter.component.css';

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Shenanometer() {
    const [totalFunds, setTotalFunds] = useState(0);
    const { rive, RiveComponent } = useRive({
        src: '@/../public/new-meter.riv',
        stateMachines: "main",
        autoplay: true,
    });
    const donationsTotalInput = useStateMachineInput(rive, 'main', 'totalFunds');

    const getTotalFunds = async () => {
        let fetchFunds = 0;
        try {
            // charity id for shenanigans = 1
            const { data, error } = await supabaseClient.from('DonationData').select().match({charity_id: 1});
            if (data) {
                fetchFunds = data.reduce((acc: any, row: any) => acc + row.amount, 0);
            }
        } catch (e: any) {
            console.log(e);
        }
        if (donationsTotalInput) {
            setTotalFunds(fetchFunds);
            donationsTotalInput.value = fetchFunds;
        }
    }

    useEffect(() => {
        getTotalFunds();
    }, [donationsTotalInput]);
    return (
        <>
        <section className="comic-style relative overflow-hidden">
            <div className="flex flex-col justify-center items-center absolute inset-0">
                <img
                    src={comicBg.src}
                    alt="she-nani-gans bg"
                    className="comic-bg-animate absolute min-w-[350%] sm:min-w-[350%]"
                ></img>
            </div>
            <div className="relative flex flex-col items-center gap-3 min-h-96 sm:min-h-[35rem] py-5">
                <h1 className="relative text-yellow-300 text-5xl text-center tracking-wider">
                    <span className="absolute text-black top-1 left-1 whitespace-nowrap">SHE-NANO-METER</span>
                    <span className="relative"><span className="text-main">SHE</span>-NANO-METER</span>
                </h1>
                <div className="h-full flex flex-row justify-center items-center gap-2">
                    <div className="text-2xl p-3 rounded-full bg-red-700">$
                        <span className="text-4xl p-1">{ totalFunds }</span>
                    </div>
                    <div className="h-[20rem] w-[10rem] flex justify-center">
                        <RiveComponent className="h-full w-full"/>
                    </div>
                    <div className="hidden sm:block text-lg p-4 w-[30%] rounded-full tracking-wider bg-red-700 text-center">
                        <span className="text-xl text-yellow-300">TO DONATE:</span><br/>Zelle our to treasurer <span className="text-blue-300">Luke! </span>
                        @973-486-5118 THANK YOU!!
                    </div>
                </div>
                <div className="flex flex-col w-3/4 lg:w-1/2 gap-4">
                    <div className="bg-main rounded-lg items-center text-xl">
                        <h1 className="p-2 text-center">TIER 4 | FLAME OR FROST</h1>
                    </div>
                    <div className="bg-dark-main rounded-lg flex flex-col text-md tracking-wide text-center p-2">
                        <h1>Watch as out E-board suddenly comes together for a surprice chereographed routine...
                            Will they captivate the crowd or fade into the background as quickly as they appeared?
                        </h1>
                    </div>
                </div>
                <div className="sm:hidden self-stretch text-lg tracking-wider bg-red-700 text-center">
                    <span className="text-xl text-yellow-300">TO DONATE:</span><br/>Zelle our to treasurer <span className="text-blue-300">Luke! </span>
                    @973-486-5118 THANK YOU!!
                </div>
            </div>
            {/* <img src={comicCld.src} className="absolute h-32 md:h-64 left-[-10rem] top-[-6rem]"></img>
            <img src={comicCld.src} className="absolute h-32 md:h-64 right-[-10rem] top-[-6rem]"></img> */}
        </section>
        </>
    );
}