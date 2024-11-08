import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Calendar2 from '../components/Calendar2';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState(getDaysOfWeek(new Date()));

  function handleDateChange(e) {
    const date = new Date(e.target.value);
    setSelectedDate(date);
    setDaysOfWeek(getDaysOfWeek(date));
  }

  function getDaysOfWeek(startDate) {
    const days = [];
    const current = new Date(startDate);
    current.setDate(current.getDate() - current.getDay()); // Inizio della settimana (domenica)
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }

  return (
    <div className='relative'>
      <div className='h-screen w-screen items-center'>
        <Calendar2/>
        <div className='flex items-center justify-center'>
        <label className='block text-lg mb-2'>Seleziona una data:</label>
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]} 
          onChange={handleDateChange} 
          className='p-2 border rounded mb-4 ml-2'
        />
        </div>
        <Calendar days={daysOfWeek} />
        <div className='fixed bottom-4 right-4 flex'>
          <Link to='/contacts'>
            <div
              className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105'
            >
              <RiContactsBook3Fill />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
