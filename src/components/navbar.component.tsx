'use client'
import { useState } from 'react';
import Image from 'next/image';
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import './navbar.component.css';

export default function NavBar() {
    let [menuDropped, setMenu] = useState(false);
    const pages = [
        {
            name: 'Home',
            id: 0
        }, {
            name: 'About Us',
            id: 1
        }, {
            name: 'Executive Board',
            id: 2
        }, {
            name: 'Events',
            id: 3
        }, {
            name: 'Corporate',
            id: 4
        }, {
            name: 'Contact Us',
            id: 5
        }
    ]
    return (
        <header className="sticky top-0 z-20">
            <div className='flex flex-col bg-dark-main relative overflow-auto'>
                <div className="flex justify-between md:justify-center items-stretch h-28">
                    <div className='flex flex-row gap-3 items-center font-bold text-4xl px-6'>
                        <Image src="/she-logo.png" alt="she logo"
                        width={80} height={80} className="shrink-0"></Image>
                        <h1 className="hidden md:block">Society of Hispanic Engineers</h1>
                        <h1 className="block md:hidden tracking-wide text-5xl">S.H.E.</h1>
                    </div>
                    <div className="relative flex md:hidden text-5xl justify-end items-center grow px-6
                    cursor-pointer" onClick={() => setMenu(!menuDropped)}>
                        <VscMenu className={"absolute duration-300 " + (menuDropped ? 'icon-spin-fade-out' : 'icon-spin-fade-in')} />
                        <VscChromeClose className={"absolute duration-300 " + (menuDropped ? 'icon-spin-fade-in' : 'icon-spin-fade-out')} />
                    </div>
                </div>
                <div className={(menuDropped ? 'open-nav' : 'close-nav') +
                    " md:max-h-none flex flex-col justify-start md:flex-row md:divide-x-2 flex-grow divide-white items-stretch overflow-y-hidden transition-all duration-300"}>
                    {
                    pages.map( pageName => {
                        return (
                            <div className='flex justify-center items-center basis-0 grow p-6 md:p-3 shrink-0 px-2 hover:bg-main hover:shadow-lg'
                            key={pageName.id}>
                                <h1 className="text-3xl md:text-base font-semibold text-center">{pageName.name.toUpperCase()}</h1>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        </header>
    );
}