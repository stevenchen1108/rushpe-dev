'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';
import { createClient } from "@supabase/supabase-js";
import comicBg from "@/../public/comic-bg.jpg";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DateAuction() {
    const [totalFunds, setTotalFunds] = useState(100);
    const { rive, RiveComponent } = useRive({
        src: '../../date-auction-ani.riv',
        stateMachines: "main",
        autoplay: true,
    });

    const getTotalFunds = async () => {
        let fetchFunds = 0;
        try {
            // charity id for shenanigans = 1
            const { data, error } = await supabaseClient.from('DonationData').select().match({charity_id: 2});
            if (data) {
                fetchFunds = data.reduce((acc: any, row: any) => acc + row.amount, 0);
            }
        } catch (e: any) {
            console.log(e);
        }
        setTotalFunds(fetchFunds);
    }

    useEffect(() => {
        getTotalFunds();
    }, []);

    return (
        <>
        <section className="h-full w-full lg:w-1/2 relative pb-3 lg:pb-0">
            <div className="max-w-full flex flex-col gap-2 justify-center items-center overflow-hidden">
                <div className="h-[20rem] w-full sm:h-[35rem] sm:w-[49rem] lg:h-[30rem] lg:w-[30rem] xl:h-[30rem] xl:w-[40rem]">
                    <RiveComponent className="h-full w-full"/>
                </div>
                {/* <div className="text-center text-2xl">
                    <h1 className="italic font-bold">$
                    <span className="text-pink-400 text-4xl">{totalFunds}
                        </span>  raised from our Alumni!<br/>Thank you!</h1>
                </div> */}
            </div>
        </section>
        </>
    );
}