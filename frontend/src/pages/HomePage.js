import React from 'react';
import Calendar from '../components/Calendar';
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';


function HomePage() {




  return (
    <div className='relative'>
      <div className='h-screen w-screen items-center'>
        <Calendar/>
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
