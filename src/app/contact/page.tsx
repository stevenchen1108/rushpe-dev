'use client'
import contactUsBgImage from "/public/about-pg-assets/contact-us-bg.jpg";
import Image from "next/image";
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { SiGroupme } from "react-icons/si";
import { useForm, SubmitHandler } from 'react-hook-form';
//import { supabaseClient } from '../../../backend';
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactUs() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const [ hasSubmitted, setSubmissionMessage ] = useState(false);
    const sendContactFormData = async (userInput: any) => {
        try {
            await supabaseClient.from('general-questions').insert(
                {
                    first_name: userInput.firstName, last_name: userInput.lastName, email: userInput.email,
                    phone_num: userInput.phoneNum, desc: userInput.desc
                }
            );
        } catch (e: any) {
            console.log(e);
        }
        console.log(userInput);
        setSubmissionMessage(true);
        reset();
    }
    return (
        <>
            <section className="relative py-28 lg:px-72">
                <Image alt="she general body meeting" src={contactUsBgImage} fill placeholder='blur'
                className="object-cover"></Image>
                <div className="relative bg-white text-black flex flex-col items-center p-5 gap-4 text-center">
                    <h3 className="text-4xl tracking-wide font-bold">Contact Us!</h3>
                    <p className="w-4/5">Get in touch with us if you have any questions, comments, or concerns!
                        <br/><br/>
                        Click the icons for our socials below!</p>
                    <div className="flex flex-row gap-5 text-4xl md:text-5xl md:p-4 md:gap-9">
                        {/* <a href="https://groupme.com/join_group/101562896/JPrsE9dd"><SiGroupme /></a> */}
                        <a href="https://www.instagram.com/shpe_ru/"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/rutgers-university-shpe-686bba295"><FaLinkedinIn /></a>
                        <a href="https://www.facebook.com/rutgers.she/"><FaFacebook /></a>
                        <a href="https://www.tiktok.com/@shpe_ru"><FaTiktok /></a>
                    </div>
                    <form onSubmit={handleSubmit(sendContactFormData)} className="flex flex-col items-center my-2 gap-5 w-full lg:p-5">
                        <div className="flex flex-col sm:flex-row gap-5 w-full">
                            <input {...register('firstName', { required: true })} placeholder="First Name *"
                            className="p-3 w-full shadow-md rounded-lg"/>
                            <input {...register('lastName', { required: true })} placeholder="Last Name *"
                            className="p-3 w-full shadow-md rounded-lg"/>
                        </div>
                        <input {...register('email', { required: true })} placeholder="Email *" type="email"
                        className="p-3 w-full shadow-md rounded-lg"/>
                        <input {...register('phoneNum')} placeholder="Phone Number"
                        className="p-3 w-full shadow-md rounded-lg"/>
                        <textarea {...register('desc', { required: true })} placeholder="Message..." rows={5}
                        className="p-3 w-full shadow-md rounded-lg text-wrap"></textarea>
                        { (errors.name || errors.desc || errors.linkedin) && <span>Please enter info</span> }
                        { (hasSubmitted) ? (<span>Message submitted! Thank you!</span>) : (<></>) }
                        <input type="submit"
                        className="p-3 w-2/3 shadow-md rounded-lg bg-main text-white font-bold hover:bg-dark-main transition-colors"/>
                    </form>
                </div>
            </section>
        </>
    );
}