'use client'
import { useState, useEffect } from 'react';
import EventImage1 from '@/../public/shpetinas/events/womens-day-2025.jpg';
import EventImage2 from '@/../public/shpetinas/events/shadow.png';

export default function ShpetinasEvents() {

    var [isMounted, setMount] = useState(false);
    var [shpetinasEvents, setEvents] = useState([]);

    const fetchEvents = async () => {
        const calendarId = 'c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com';
        try {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CAL_API_KEY ? process.env.NEXT_PUBLIC_GOOGLE_CAL_API_KEY : 'AIzaSyBCIOf5yqU8ThEm-h95QvynRXrM4H7wnUs'}&supportsAttachments=true&singleEvents=true&orderBy=startTime`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    }
                },
            ).then( (res) => {
                return res.json();
            });
            if (!isMounted) {
                response.items.forEach( (calendarEvent: any) => {
                    if (calendarEvent.start.date) {
                        // all day event, default it to 12am
                        calendarEvent.start.dateTime = calendarEvent.start.date + 'T12:00:00Z';
                        calendarEvent.end.dateTime = calendarEvent.end.date + 'T12:00:00Z';
                    }
                    // default color
                    calendarEvent.color = '#D27D7C';
                    var desc: String = "";
                    if (calendarEvent.description) {
                        desc = calendarEvent.description;
                    } else {
                        desc = " ";
                    }
                    if (desc) {
                        desc = desc.replace(/<br>/g, '\n');
                        desc = desc.replace(/(<a href=".*">)|(<\/a>)/g, '');
                        const optionsList: Array<string> = ['RSVP', 'COLOR', 'IMAGE', 'TEXT', 'ID', 'SHPETINAS'];
                        optionsList.forEach( (option) => {
                            const regex = new RegExp("\\s*" + option + ":\\s*([^\\s]+)", 'g');
                            const matches = regex.exec('' + desc);
                            if (matches) {
                                const optionValue = matches[1];
                                calendarEvent[option.toLowerCase()] = optionValue;
                            }
                            desc = desc.replace(regex, '');
                        });
                        calendarEvent.description = desc;
                    }
                });
                setEvents(response.items.filter( (calendarEvent: any) => calendarEvent.shpetinas != null ));
            }
            console.log(shpetinasEvents);
            setMount(true);
        } catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        fetchEvents();
    });

    return (
        <>
            <div className="flex flex-row flex-wrap justify-center bg-[#ffdbf8] text-black p-4">
                <div className="flex flex-col bg-white rounded-3xl p-5 mb-5 lg:mx-80 md:mx-8 sm:mx-0">
                    <h1 className="text-center font-bold tracking-wide text-5xl mx-auto my-auto">UPCOMING EVENTS</h1>
                </div>
                <ul className="flex flex-row flex-wrap justify-center gap-3">
                    {
                        shpetinasEvents.map( (event: any, index) => {
                            return (
                                <li className="bg-white rounded-md shadow-md p-6 sm:w-5/12">
                                    <div className="flex flex-col w-full text-center items-center">
                                        <div className="flex justify-center">
                                            <img className="rounded-2xl" src={EventImage1.src} alt="event-img-1" width={500} height={500} />
                                        </div>
                                        <div className="text-center">
                                            <h2 className="mt-5 mb-3 font-bold text-[#841f70] text-3xl tracking-wide">{event.summary}</h2>
                                            <div className="text-3xl">                                    
                                                <p><strong>Date:</strong> March 6th</p>
                                                <p><strong>Location:</strong> Kathleen W. Ludwig Global Village Living Learning (Jameson Complex)</p>
                                                <p><strong>Time:</strong> 12pm - 3pm</p>
                                            </div>
                                            <div className="mt-5 text-2xl">
                                                <p> <strong>Celebrate International Womanhood!</strong><br />
                                                    The annual Women&apos;s Day at Douglass, presented by the Douglass Diversity, Equity, and Inclusion Program, 
                                                    will highlight the accomplishments of Douglass students, alumnae, and women within the Rutgers community. 
                                                    Women&apos;s Day at Douglass will include messages from special 
                                                    guests, activities, prizes, food, and more.
                                                </p>
                                            </div>
                                        </div>                      
                                    </div>
                                </li>
                            );
                        })
                    }

                    <li className="bg-white rounded-md shadow-md p-6 sm:w-5/12">
                        <div className="flex flex-col w-full text-center items-center">
                            <div className="flex justify-center">
                                <img className="rounded-3xl" src={EventImage2.src} alt="event-img-2" width={500} height={500} />
                            </div>
                            <div className="text-center">
                                <h2 className="mt-5 mb-3 font-bold text-[#841f70] text-3xl tracking-wide">Spring Shadow Program</h2>
                                <div className="text-2xl">   
                                    <p><strong>Dates: </strong> April 10th - 12th</p>
                                    <p><strong>Location: </strong> Busch Campus</p>
                                    <p><strong>Arrival Time:</strong> 5:30pm - 6:30pm (April 10)</p>     
                                    <p><strong>Departure Time:</strong> 3:30pm - 4:30pm (April 12)</p>                                 
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p> This Shadow Program will be the host of professional companies and several student organizations that will 
                                        provide all the resources for the students that attend. <br/>
                                        The Shadow Program seeks young students in their <b>Sophomore, Junior, and Senior</b> years that are eager to grow as individuals, develop 
                                        themselves professionally and are highly motivated to inspire others by example. A short essay question is also required.<br/>
                                        Click this <a className="underline text-blue-700" href="https://docs.google.com/forms/d/e/1FAIpQLSeVXa2dN-avDarHCv_P5GWBslzYhL5i71vaLQCnFNt2CfmtfQ/viewform">link</a> to fill out the application form, which is due <b>February 24th</b>.
                                    </p>
                                </div>
                            </div>                      
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
