'use client'
import { eachDayOfInterval, addDays, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, set, getWeekOfMonth, format } from 'date-fns';
import { useState, useEffect } from 'react';
import './event-calendar.component.css';
import { VscChromeClose } from "react-icons/vsc";

class Event {
    summary: string;
    description: string;
    start: {date: string, dateTime: string};
    end: {date: string, dateTime: string};
    attachments: Array<{fileId: String}>;
    rsvp: string;
    color: string;
    image: string;
    text: string;

    constructor() {
        this.summary = '';
        this.description = '';
        this.start = {date: '', dateTime: ''};
        this.end = {date: '', dateTime: ''};
        this.attachments = [];
        this.rsvp = '';
        this.color = '';
        this.image = '';
        this.text = '';
    }
}

class CalendarDay extends Date {
    selected: boolean;
    events: Array<Event>;

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
    var [daySelected, updateDaySelected] = useState(dayArray[today.getDate() + dateIndexOffset]);
    var [eventSelected, updateEventSelected] = useState(new Event());
    var [calendarData, setCalendar] = useState<CalendarDay[]>(dayArray);
    var [eventPopup, setEventPopup] = useState(false);
    var [isMounted, setMount] = useState(false);
    daySelected.selected = true;

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
                        calendarEvent.start.dateTime = calendarEvent.start.date + 'T12:00:00Z';
                        calendarEvent.end.dateTime = calendarEvent.end.date + 'T12:00:00Z';
                    }
                    // default color
                    calendarEvent.color = '#D27D7C';
                    var desc: String = calendarEvent.description;
                    if (desc) {
                        desc = desc.replace(/<br>/g, '\n');
                        desc = desc.replace(/(<a href=".*">)|(<\/a>)/g, '');
                        const optionsList: Array<string> = ['RSVP', 'COLOR', 'IMAGE', 'TEXT'];
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
                    const startDate = new Date(calendarEvent.start.dateTime);
                    if (startDate.getMonth() === today.getMonth() && startDate.getFullYear() === today.getFullYear()) {
                        dayArray[startDate.getDate() + dateIndexOffset].events.push(calendarEvent);
                    }
                });
                setCalendar(dayArray);
                setMount(true);
            }
        } catch (e) {
            console.log(e);
        }

    };

    const selectDate = function (dayObj: CalendarDay) {
        daySelected.selected = false;
        updateDaySelected(dayObj);
        dayObj.selected = true;
        if (!dayObj.events.length) {
            setEventPopup(false);
        }
        // console.log(dayObj.events, dayArray[dayObj.getDate() + dateIndexOffset].events);
    };

    const selectEvent = function (eventObj: Event) {
        updateEventSelected(eventObj);
        setEventPopup(true);
    }

    const toolTipPosition = function () {
        const eventObj: any = eventSelected;
        const focusedDay: Date = new Date(eventObj.start.dateTime ? eventObj.start.dateTime : today);
        const weekOfMonth = getWeekOfMonth(focusedDay) + (focusedDay.getMonth() - today.getMonth()) * (getWeekOfMonth(endOfMonth(today)) - 1);
        const stylingObj = {left: 'auto', right: 'auto', top: (14 * weekOfMonth) + '%', bottom: 'auto'};
        if (focusedDay.getDay() < 4) {
            stylingObj.left = (14.28 * (focusedDay.getDay() + 1) + 1) + '%';
        } else {
            stylingObj.right = (14.28 * (7 - focusedDay.getDay()) + 1) + '%';
        }
        return stylingObj;
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <section className="bg-white text-black p-2 sm:p-12">
                <div className="relative py-1">
                    <h1 className="text-left tracking-widest text-3xl p-1">OCTOBER</h1>
                    <div className="grid grid-cols-7 text-center text-sm">
                        {
                            weekArray.map( (day, index) => {
                                return (
                                    <span key={index + 'weekName'}>{day}</span>
                                )
                            })
                        }
                    </div>
                    {
                        (
                            eventPopup && <div className="hidden sm:flex z-10 absolute flex-col bg-slate-100 min-w-1/6 max-w-[28rem] p-3 transition-all shadow-md"
                            style={toolTipPosition()}>
                                <div className="flex flex-row justify-between items-center text-lg gap-3">
                                    <h1 className="font-bold">{eventSelected.summary}</h1>
                                    <VscChromeClose className="rounded-lg hover:bg-slate-300" onClick={ () => setEventPopup(false) }/>
                                </div>
                                <p className="text-sm font-medium tracking-wide"><i>{!eventSelected.start.date ? (format(new Date(eventSelected.start.dateTime), 'EE, h:mm a - ') +
                                    format(new Date(eventSelected.end.dateTime), 'h:mm a')) : format(new Date(eventSelected.start.dateTime), 'EEEE')}</i></p>
                                <p className="pt-1 text-sm whitespace-pre-line">{eventSelected.description}</p>
                                { (eventSelected.attachments || eventSelected.image) &&
                                <img className="pt-2" src={eventSelected.image ? eventSelected.image :
                                    ('https://lh3.googleusercontent.com/d/' + eventSelected.attachments[0].fileId)}></img> }
                                { eventSelected.rsvp &&
                                <a className="p-1 my-2 hover:bg-main-hover self-center bg-main text-white tracking-wider text-center w-32"
                                    href={eventSelected.rsvp}>RSVP</a> }
                            </div>
                        )
                    }
                    <div className="calendar-grid text-xs text-center rounded-md">
                        {
                            calendarData.map( (dayObj, index) => {
                                return (
                                    <div className={"relative hover:bg-slate-50 min-h-16 transition-all date-panel" + (dayObj.getTime() === daySelected.getTime() ? " selected-panel" : "") + (dayObj.getMonth() === today.getMonth() ? "" : " opacity-50")}
                                        key={index + 'panel'} onClick={ () => selectDate(dayObj) }>
                                        <div className={"relative p-[0.1rem] size-4" + (dayObj.getTime() === today.getTime() ? " today-panel text-white" : "")}>
                                            <span className={"absolute inset-0"}>{dayObj.getDate()}</span>
                                        </div>
                                        <div className="flex flex-col inset-x-0 gap-1 pt-1 my-1">
                                            {
                                                dayObj.events.map( (eventObj, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="md:hidden bg-light-main inset-x-0 min-h-1 rounded-md" style={eventObj.color ? {'backgroundColor': eventObj.color} : {}}></div>
                                                            <div className="hidden md:block hover:brightness-95 bg-light-main inset-x-0 min-h-1 rounded-sm text-sm transition-colors"
                                                            style={{  ...eventObj.color && {'backgroundColor': eventObj.color}, ...eventObj.text && {'color': eventObj.text} }}
                                                            onClick={ () => selectEvent(eventObj) }>
                                                                {eventObj.summary}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <h1 className={'w-fit text-sm px-2 bg-slate-100 rounded-md sm:mx-auto' + (daySelected.events.length ? '': ' hidden')}>{format(daySelected, 'EEEE, MMM do')}</h1>
                <div className="flex flex-col gap-2 py-1 text-sm sm:text-md sm:items-center">
                    {
                        daySelected.events.map( (eventObj, index) => {
                            const eventDate: Date = new Date(eventObj.start.dateTime);
                            const endTime: Date = new Date(eventObj.end.dateTime);
                            return (
                                <div key={index} className="relative sm:w-4/5 p-2 sm:p-3 min-h-8 rounded-md overflow-hidden bg-slate-100 shadow-sm"
                                    style={ eventObj.color ? {borderColor: eventObj.color, borderLeft: '8px solid ' + eventObj.color} : {} }>
                                    <div className="flex flex-row justify-between">
                                        <h1 className="text-md font-bold">{eventObj.summary}</h1>
                                        <h1 className="sm:text-md"><i>{format(eventDate, 'h:mm aaa') + format(endTime, ' - h:mm aaa')}</i></h1>
                                    </div>
                                    <div className="relative w-full flex flex-row justify-between">
                                        <p className="text-xs sm:text-sm bottom-event-details">{eventObj.description}</p>
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