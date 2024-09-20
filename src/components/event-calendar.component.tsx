'use client'
import { eachDayOfInterval, addDays, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { useState } from 'react';
import './event-calendar.component.css';

class CalendarDay extends Date {
    selected: boolean;

    constructor(date: Date = new Date(), selected: boolean = false) {
        super(date);
        this.selected = selected;
    }
}

export default function Calendar() {
    const weekArray: Array<String> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const today: Date = new Date();
    const firstDayOfMonth: Date = startOfMonth(today);
    const firstDayOfFirstWeek: Date = startOfWeek(firstDayOfMonth);
    const lastDayOfLastWeek: Date = endOfWeek(endOfMonth(today), { weekStartsOn: 0 });
    const dayArray: Array<CalendarDay> = eachDayOfInterval({
        start: firstDayOfFirstWeek,
        end: lastDayOfLastWeek
    }).map( date => {
        return new CalendarDay(date, false);
    });
    var [prevSelected, updatePrev] = useState(dayArray[firstDayOfMonth.getDay() + today.getDate() - 1]);
    prevSelected.selected = true;

    const selectDate = function (dayObj: CalendarDay) {
        prevSelected.selected = false;
        updatePrev(dayObj);
        dayObj.selected = true;
        console.log(dayObj, dayObj.selected);
    };

    return (
        <>
            <section className="bg-white text-black p-2">
                <div className="py-1">
                    <h1 className="text-center tracking-widest text-3xl p-1">SEPTEMBER</h1>
                    <div className="grid grid-cols-7 text-center text-sm">
                        {
                            weekArray.map( (day, index) => {
                                return (
                                    <span key={index}>{day}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="relative grid grid-cols-7 text-xs text-right">
                    {
                        dayArray.map( (dayObj, index) => {
                            return (
                                <div className={"h-16 relative date-panel" + (dayObj.getTime() === prevSelected.getTime() ? " selected-panel" : "")} key={index} onClick={ () => selectDate(dayObj) }>
                                    <span className={"p-1" + (dayObj.getMonth() === today.getMonth() ? "" : " text-gray-300")}>{dayObj.getDate()}</span>
                                </div>
                            );
                        })
                    }
                </div>
                <div></div>
            </section>
        </>
    );
}