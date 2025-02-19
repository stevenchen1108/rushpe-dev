'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import asImage from '@/../public/home-pg-assets/academic-support.jpg';
import isImage from '@/../public/home-pg-assets/internship-scholarship.jpg';
import prImage from '@/../public/home-pg-assets/professionalism.jpg';
import neImage from '@/../public/home-pg-assets/networking.jpg';
import faImage from '@/../public/home-pg-assets/fun-activities.jpg';
import vnImage from '@/../public/home-pg-assets/volunteering.jpg';
import RubyInfo from '@/components/ruby.component';
import Shenanometer from '@/components/she-nano-meter.component';
import DateAuctionComp from '@/components/date-auction.component';

import ImgBook from '@/components/img-book.component';
import imgBook1 from '/public/home-pg-assets/alumni-panel-f24.jpg';
import imgBook2 from '/public/home-pg-assets/bowlero-f24.jpg';
import imgBook3 from '/public/home-pg-assets/cultural-gbm-f24-1.jpg';
import imgBook4 from '/public/home-pg-assets/cultural-gbm-f24-2.jpg';
import imgBook6 from '/public/home-pg-assets/first-gbm-f24-1.jpg';
import imgBook7 from '/public/home-pg-assets/first-gbm-f24-2.jpg';
import imgBook8 from '/public/home-pg-assets/first-gbm-f24-3.jpg';
import imgBook9 from '/public/home-pg-assets/beach-sweeps-f24-1.jpg';
import imgBook10 from '/public/home-pg-assets/prof-gbm-f24-1.jpg';


export default function Home () {

  const frontPageLinks = [
    {
      id: 0,
      title: 'Upcoming Events',
      desc: 'View our upcoming events & meetings.',
      link: 'events'
    }, {
      id: 1,
      title: 'Send Us A Message',
      desc: 'Deliver questions, comments, or concerns.',
      link: 'contact'
    }, {
      id: 2,
      title: 'Estamos Aqui',
      desc: 'Know your rights regardless of your citizenship status',
      link: 'info/know-your-rights'
    }
  ];
  const offeringLinks = [
    {
      id: 0,
      title: 'Academic Support',
      imgName: asImage,
      link: 'info/academics'
    }, {
      id: 1,
      title: 'Professionalism',
      imgName: prImage,
      link: 'info/professionalism'
    }, {
      id: 2,
      title: 'Internship & Scholarship',
      imgName: isImage,
      link: 'corporate'
    }, {
      id: 3,
      title: 'Networking',
      imgName: neImage,
      link: 'info/networking'
    }, {
      id: 4,
      title: 'Fun Activities',
      imgName: faImage,
      link: 'events'
    }, {
      id: 5,
      title: 'Volunteering',
      imgName: vnImage,
      link: 'events'
    },
  ];

  return (
    <>
      <section className="relative w-full h-[45rem] overflow-hidden flex justify-center items-center">
        <video autoPlay={true} muted loop className="min-w-[90rem] w-full object-cover">
          {/* set to true ^^^ */}
          <source src="/home-pg-assets/home-bg-vid-jan2025.mp4" type="video/mp4"/>       
        </video>
        <div className="absolute text-center top-0 sm:top-[10%] sm:text-left md:left-[10%]">
          <div className="text-wrap sm:w-[37rem] p-4 bg-black bg-opacity-25">
            <h2 className="text-5xl font-semibold tracking-wide">Welcome to RUSHPE!</h2>
            <p className="text-lg my-3 sm:max-w-[80%]">
              Our Rutgers chapter seeks to foster both academic
              and professional education to further individuals of
              any denomination in all fields of study.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 sm:gap-4 flex justify-center flex-wrap sm:py-3">
          {
            frontPageLinks.map( link => {
              return (
                <a key={link.id} className="bg-white min-h-12 w-1/2 rounded-t-md sm:w-56 sm:h-40 px-3 shadow-2xl sm:rounded-md text-center hover:scale-105 hover:bg-gray-100 ease-linear"
                    href={link.link}>
                  <h1 className="h-full sm:p-3 sm:h-auto sm:w-auto sm:text-2xl text-black text-xl font-semibold tracking-wide">
                    {link.title}
                  </h1>
                  <p className="hidden sm:block text-sm text-gray-500 h-0 sm:h-auto">
                    {link.desc}
                  </p>
                </a>
              );
            })
          }
        </div>
      </section>
      <div className="w-full h-2 bg-blue-900"></div>
      <section className="relative flex flex-col lg:flex-row">
        <Shenanometer></Shenanometer>
        <DateAuctionComp></DateAuctionComp>
      </section>
      <div className="relative overflow-hidden h-[40rem]">
        <div className="absolute flex flex-col align-middle h-full w-full z-10 py-24 bg-black bg-opacity-30 right-0 text-center
        md:justify-center md:w-1/2 md:min-w-[35rem] sm:p-24 md:text-left">
          <h1 className="tracking-wider font-bold text-6xl">Our Mission</h1>
          <p className="my-5">&quot;Recruit, retain, and graduate minority students majoring in engineering,
            math, and science.&quot;</p>
          <p className="font-semibold">You do not have to be Hispanic to join. We accept everyone</p>
        </div>
        <Image
        src="/home-pg-assets/our-mission-bg.jpg"
        placeholder="blur"
        blurDataURL="/home-pg-assets/our-mission-bg.jpg"
        alt="our mission" fill
        sizes="(max-width: 768px) 100vw"
        objectFit="cover"
        ></Image>
        <ImgBook imgList={[imgBook1, imgBook2, imgBook3, imgBook4, imgBook6, imgBook7, imgBook8, imgBook9, imgBook10]}>
        </ImgBook>
      </div>
      <div className="relative min-w-72 py-4">
        <h1 className='w-full text-5xl tracking-wide font-semibold text-center'>
          We Offer
        </h1>
        <div className="flex flex-wrap align-middle justify-center sm:gap-5 overflow-clip">
          {
            offeringLinks.map( offerItem => {
              return (
                <div key={offerItem.id} className="block grow md:grow-0 relative h-[28rem] md:h-[22rem] w-72 hover:scale-105 transition-all">
                  <Link href={"/" + offerItem.link}>
                    <Image src={offerItem.imgName}
                    placeholder="blur"
                    alt={offerItem.title} fill
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    ></Image>
                    <div className="absolute flex flex-col justify-end align-middle inset-0">
                      <h1 className="text-3xl font-semibold text-center my-auto">
                        {offerItem.title.toUpperCase()}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
