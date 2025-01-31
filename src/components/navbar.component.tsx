'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import './navbar.component.css';

export default function NavBar({ currLink, isTransparent }: { currLink: string, isTransparent: boolean }) {
    let [menuDropped, setMenu] = useState(false);
    const pages = [
        {
            name: 'Home',
            link: '',
            id: 0
        }, {
            name: 'About Us',
            link: 'about-us',
            id: 1
        }, {
            name: 'Executive Board',
            link: 'executive-board',
            id: 2
        }, {
            name: 'Events',
            link: 'events',
            id: 3
        }, {//
            name: 'Corporate',
            link: 'corporate',
            id: 4
        }, {
            name: 'Contact Us',
            link: 'contact',
            id: 5
        }
    ]
    return (
        <header className={"md:top-0 z-20" + (isTransparent ? ' absolute left-0 right-0' : '')}>
            <div className={'flex flex-col overflow-auto' + (isTransparent ? '' : ' bg-dark-main')}>
                <div className="flex justify-between md:justify-center items-stretch h-24 sm:h-28">
                    <div className='flex flex-row gap-2 sm:gap-3 items-center font-bold px-2 sm:px-6'>
                        <Image src="/she-logo.png" alt="she logo"
                        width={80} height={80} className="shrink-0"></Image>
                        <h1 className="block w-20 sm:w-4/5 md:w-auto text-md sm:text-4xl">Society of Hispanic Engineers</h1>
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
                            <Link className={"flex justify-center items-center basis-0 grow p-6 md:p-3 shrink-0 px-2 hover:shadow-lg" + (isTransparent ? ' hover:bg-slate-700 hover:bg-opacity-30' : ' hover:bg-main')}
                            key={pageName.id} href={'/' + pageName.link} onClick={() => setMenu(!menuDropped)}>
                                <h1 className="text-3xl md:text-base font-semibold text-center">{pageName.name.toUpperCase()}</h1>
                            </Link>
                        );
                    })
                    }
                </div>
            </div>
        </header>
    );
}