import React from 'react';
import { Link } from 'react-router-dom';

function Calendar({ days }) {
  const giorniSettimana = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];

  return (
    <div className="grid grid-cols-7 gap-4 h-screen w-screen items-center justify-center">
      {days.map((day, index) => (
        <Link key={index} to={`/day/${giorniSettimana[index]}/${day.toLocaleDateString('it-IT').split('/').join('-')}`}>
          <div className="bg-red-800 aspect-square rounded-lg flex items-center justify-center text-white text-lg font-semibold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105">
            {giorniSettimana[index]} <br /> {day.toLocaleDateString('it-IT')}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Calendar;
