'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';


export default function Form() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [ hasSubmitted, setSubmissionMessage ] = useState(false);
    const sendData = async (userInput: any) => {
        console.log(typeof(userInput), userInput, JSON.stringify(userInput));
        const userFormData = new FormData();
        const nonFileFields: any = {};
        Object.keys(userInput).filter( fieldName => fieldName !== 'fileList').forEach( fieldName => {
            nonFileFields[fieldName] = userInput[fieldName];
        });
        nonFileFields['imgFileDownloadURL'] = ''; // leave for backend to fill
        nonFileFields['submittedOn'] = new Date().toISOString();
        userFormData.append('nonFieldData', JSON.stringify(nonFileFields));
        userFormData.append('targetFile', userInput['fileList'][0]);
        console.log(userFormData);
        fetch('/api/test', {
            method: 'POST',
            body: userFormData
            })
            .then((response) => response.json())
            .then((data) => console.log(data.message));
        setSubmissionMessage(true);
    };
    return hasSubmitted ? (
            <section className="flex flex-col items-center bg-white text-black p-8 py-64">
                <h1 className="text-xl italic">Thank you for submitting!</h1>
            </section>
        ) : (
        <>
        <section className="flex flex-col items-center bg-white text-black p-6">
            <h1 className="text-2xl">EBOARD Form</h1>
            <form onSubmit={handleSubmit(sendData)} className="flex flex-col items-center m-3 gap-5">
                <input {...register('name', { required: true })} placeholder="Name"
                className="p-3 w-full shadow-md rounded-lg"/>
                <textarea {...register('desc', { required: true })} placeholder="Brief Intro" rows={5}
                className="p-3 w-full shadow-md rounded-lg text-wrap"></textarea>
                <input {...register('linkedin', { required: true, pattern: /linkedin.com/})} placeholder="LinkedIn URL" type="url"
                className="p-3 w-full shadow-md rounded-lg"/>
                {/* <p className="font-semibold self-start">Optional:</p>
                <p>If you want to change your headshot, upload here:</p>
                <input {...register('fileList')} placeholder="Image" type="file"
                className="p-3 w-full shadow-md rounded-lg"/>
                <input {...register('instareel')} placeholder="Please send me ur funniest reel :D" type="url"
                className="p-3 w-full shadow-md rounded-lg"/> */}
                { (errors.name || errors.desc || errors.linkedin) && <span>Enter valid input</span>}
                <input type="submit"
                className="p-3 w-2/3 shadow-md rounded-lg bg-main text-white font-bold hover:bg-dark-main transition-colors"/>
            </form>
        </section>
        </>
    );
}