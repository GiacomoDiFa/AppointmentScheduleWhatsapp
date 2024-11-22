import React from 'react';
import { TfiAgenda } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const Navbar = ({ currentDate, prevMonth, nextMonth, text }) => {
    // Formattiamo la data solo se currentDate è definito
    const formattedDate = currentDate
        ? format(currentDate, 'MMMM yyyy', { locale: it })
              .charAt(0)
              .toUpperCase() + format(currentDate, 'MMMM yyyy', { locale: it }).slice(1)
        : text;

    return (
        <div className='flex justify-center items-center border-b py-8'>
            <Link to='/'>
                <div className='mr-auto flex items-center'>
                    <div className='mr-2'><TfiAgenda size={30} /></div>
                    <div className='font-mono text-gray-500 text-2xl ml-2'>Agenda</div>
                </div>
            </Link>
            <div className='flex justify-center items-center w-full'>
                {prevMonth && nextMonth ? (
                    <>
                        <button onClick={prevMonth} className="px-10 py-2 bg-gray-200 rounded mr-10">←</button>
                        <h2 className="text-2xl font-mono">{formattedDate}</h2>
                        <button onClick={nextMonth} className="px-10 py-2 bg-gray-200 rounded ml-10">→</button>
                    </>
                ) : (
                    <h2 className="text-2xl font-mono">{formattedDate}</h2>
                )}
            </div>
        </div>
    );
};

export default Navbar;
