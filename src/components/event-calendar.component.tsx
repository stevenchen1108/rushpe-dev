'use client'
import Image from 'next/image';
import { eachDayOfInterval, addDays, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, set } from 'date-fns';
import { useState, useEffect } from 'react';
import './event-calendar.component.css';

class CalendarDay extends Date {
    selected: boolean;
    events: Array<{
        summary: string,
        description: string
        start: {date: string, dateTime: string},
        end: {date: string, dateTime: string},
        attachments: Array<{fileId: String}>
    }>;

    constructor(date: Date = new Date(), selected: boolean = false) {
        super(date);
        this.selected = selected;
        this.events = [];
    }
}

export default function Calendar() {
    const weekArray: Array<String> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const today: Date = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const firstDayOfMonth: Date = startOfMonth(today);
    const firstDayOfFirstWeek: Date = startOfWeek(firstDayOfMonth);
    const lastDayOfLastWeek: Date = endOfWeek(endOfMonth(today), { weekStartsOn: 0 });
    const dayArray: Array<CalendarDay> = eachDayOfInterval({
        start: firstDayOfFirstWeek,
        end: lastDayOfLastWeek
    }).map( date => {
        return new CalendarDay(date, false);
    });
    const dateIndexOffset: number = firstDayOfMonth.getDay() - 1;
    var [daySelected, updateSelect] = useState(dayArray[today.getDate() + dateIndexOffset]);
    var [calendarData, setCalendar] = useState<CalendarDay[]>(dayArray);
    var [mobileDropdown, setMobileDropdown] = useState(true);
    var isMounted = false;
    daySelected.selected = true;

    const fetchEvents = async () => {
        const calendarId = 'c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com';
        try {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CAL_API_KEY}&supportsAttachments=true`, {
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
                    const isFullDay = calendarEvent.start.date;
                    const startDate = new Date(isFullDay ? calendarEvent.start.date + 'T12:00:00Z' : calendarEvent.start.dateTime);
                    console.log(startDate.getDate(), dateIndexOffset);
                    if (startDate.getMonth() === today.getMonth()) {
                        dayArray[startDate.getDate() + dateIndexOffset].events.push(calendarEvent);
                    }
                });
                setCalendar(dayArray);
                isMounted = true;
            }
        } catch {
            console.log('err1');
        }

    };

    const selectDate = function (dayObj: CalendarDay) {
        daySelected.selected = false;
        updateSelect(dayObj);
        dayObj.selected = true;
        console.log(dayObj.events, dayArray[dayObj.getDate() + dateIndexOffset].events);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <section className="bg-white text-black p-2">
                <div className="py-1">
                    <h1 className="text-left tracking-widest text-3xl p-1 sm:w-5/6 sm:mx-auto">OCTOBER</h1>
                    <div className="grid grid-cols-7 text-center text-sm sm:w-5/6 sm:mx-auto">
                        {
                            weekArray.map( (day, index) => {
                                return (
                                    <span key={index}>{day}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="relative grid grid-cols-7 text-xs text-center rounded-md sm:w-5/6 sm:mx-auto">
                    {
                        calendarData.map( (dayObj, index) => {
                            return (
                                <div className={"h-16 relative transition-all date-panel" + (dayObj.getTime() === daySelected.getTime() ? " selected-panel" : "") + (dayObj.getMonth() === today.getMonth() ? "" : " opacity-50")}
                                    key={index} onClick={ () => selectDate(dayObj) }>
                                    <div className={"relative p-[0.1rem] size-4" + (dayObj.getTime() === today.getTime() ? " today-panel text-white" : "")}>
                                        <span className={"absolute inset-0"}>{dayObj.getDate()}</span>
                                    </div>
                                    <div className={"absolute flex flex-col inset-x-0 gap-1 pt-1"}>
                                        {
                                            dayObj.events.map( (eventObj, index) => {
                                                return (
                                                    <div key={index} className="bg-light-main inset-x-0 min-h-1 rounded-md"></div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="flex flex-col gap-2 sm:w-5/6 p-2 sm:mx-auto">
                    {
                        daySelected.events.map( (eventObj, index) => {
                            const isFullDay = eventObj.start.date;
                            const eventDateArr = new Date(isFullDay ? eventObj.start.date + 'T12:00:00Z' : eventObj.start.dateTime).toDateString().split(' ');
                            return (
                                <div key={index} className="rounded-md min-h-8 bg-slate-200 p-3">
                                    <div className="flex flex-row justify-between">
                                        <h1 className="text-md font-bold">{eventObj.summary}</h1>
                                        <h1 className="text-md">{eventDateArr[0] + ', ' + eventDateArr[1] + ' ' + eventDateArr[2]}</h1>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>{'\t\t\t' + eventObj.summary}</p>
                                        <h1 className="text-md">{eventDateArr[0] + ', ' + eventDateArr[1] + ' ' + eventDateArr[2]}</h1>
                                    </div>
                                    {
                                        // (eventObj.attachments) ? (
                                        // <img src={`https://drive.google.com/uc?export=${eventObj.attachments[0].fileId}`}
                                        // className="object-cover"></img>
                                        // ) : (<></>)
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
}