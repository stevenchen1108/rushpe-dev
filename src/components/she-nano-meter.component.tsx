'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Shenanometer() {
    const [totalFunds, setTotalFunds] = useState(0);
    const { rive, RiveComponent } = useRive({
        src: '../../new-meter.riv',
        stateMachines: "main",
        autoplay: true,
    });
    const donationsTotalInput = useStateMachineInput(rive, 'main', 'totalFunds');

    const getTotalFunds = async () => {
        let fetchFunds = 0;
        try {
        const { data, error } = await supabaseClient.from('ShenaniganData').select();
        if (data) {
            fetchFunds = data.reduce((acc: any, row: any) => acc + row.amount, 0);
        }
        console.log(fetchFunds);
        } catch (e: any) {
        console.log(e);
        }
        if (donationsTotalInput) {
            console.log(donationsTotalInput, fetchFunds);
            setTotalFunds(fetchFunds);
            donationsTotalInput.value = fetchFunds;
        }
    }

    useEffect(() => {
        getTotalFunds();
    }, [donationsTotalInput]);
    return (
        <>
        <section className="comic-style relative flex flex-col items-center gap-3 min-h-96 sm:min-h-[35rem] py-5">
            <h1 className="text-yellow-300 text-5xl text-center tracking-wider">
            <span className="text-main">SHE</span>-NANO-METER
            </h1>
            <div className="h-full flex flex-row justify-center items-center gap-2">
                <div className="text-2xl p-3 rounded-full bg-red-700">$
                    <span className="text-4xl p-1">{ totalFunds }</span>
                </div>
                <div className="h-[20rem] w-[10rem] flex justify-center">
                    <RiveComponent className="h-full w-full"/>
                </div>
            </div>
            <div className="bg-main rounded-lg flex flex-col items-center w-1/3 text-2xl">
                <h1 className="p-2 text-center">TIER 4 | FLAME OR FROST</h1>
            </div>
            <div className="bg-dark-main rounded-lg flex flex-col w-2/3 text-xl tracking-wide text-center p-2">
                <h1>Watch as out E-board suddenly comes together for a surprice chereographed routine...
                    Will they captivate the crowd or fade into the background as quickly as they appeared?
                </h1>
            </div>
            {/* <img src={comicCld.src} className="absolute h-32 md:h-64 left-[-10rem] top-[-6rem]"></img>
            <img src={comicCld.src} className="absolute h-32 md:h-64 right-[-10rem] top-[-6rem]"></img> */}
        </section>
        </>
    );
}