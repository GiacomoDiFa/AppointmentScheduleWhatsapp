import React from 'react';
import { Link } from 'react-router-dom';


const giorni = ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi','Venerdi', 'Sabato', 'Domenica']

function Calendar() {

    return (
        <div className="grid grid-cols-7 gap-4 h-screen w-screen items-center justify-center">
            {giorni.map(giorno =>
               <Link key={giorno} to={`/day/${giorno}`}> <div className="bg-red-800 aspect-square flex items-center justify-center text-white"
                    >
                    {giorno}
                </div></Link>)}
        </div>
    );
}

export default Calendar;
