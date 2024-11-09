import React, { useState } from 'react';
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';
import { Link } from 'react-router-dom';
import {it} from 'date-fns/locale'
import { TfiAgenda } from "react-icons/tfi";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => setCurrentDate(addDays(currentDate, 30));
    const prevMonth = () => setCurrentDate(addDays(currentDate, -30));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(day);
            day = addDays(day, 1);
        }
        days.push(week);
    }

    return (
        <div className="p-4 max-w h-[100vh] mx-auto">
            <div className='flex justify-center items-center border-b py-8 '>
                <Link to='/'>
                <div className='mr-auto flex items-center'>
                    <div className='mr-2'><TfiAgenda size={30}/></div>
                    <div className='font-mono text-gray-500 text-2xl ml-2'>Agenda</div>
                </div>
                </Link>
                <div className='flex justify-center items-center w-full'>
                    <button onClick={prevMonth} className="px-10 py-2 bg-gray-200 rounded mr-10">←</button>
                    <h2 className="text-2xl font-mono">
                        {format(currentDate, 'MMMM yyyy',{locale:it}).charAt(0).toUpperCase()+format(currentDate, 'MMMM yyyy',{locale:it}).slice(1)}
                    </h2>
                    <button onClick={nextMonth} className="px-10 py-2 bg-gray-200 rounded ml-10">→</button>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center font-bold">
                {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
                    <div key={day} className="p-2">{day}</div>
                ))}
            </div>
            {days.map((week, idx) => (
                <div key={idx} className="grid grid-cols-7 items-center justify-center">
                    {week.map(day => (
                        <Link key={day} to={`/day/${day.toLocaleDateString('it-IT').split('/').join('-')}`}>
                            <div
                                className={`
                                    p-4 border h-28 border-gray-200 flex items-center justify-center 
                                    ${format(day, 'MM') !== format(currentDate, 'MM') ? 'text-gray-400' : ''}
                                    ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-200'}
                                `}
                            >
                                {format(day, 'd')}
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Calendar;
