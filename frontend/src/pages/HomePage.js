import React from 'react';
import Calendar from '../components/Calendar';
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Button from '../components/Button';


function HomePage() {
  return (
    <div className='relative'>
      <div className='h-screen w-screen items-center'>
        <Calendar />
        <div className='fixed bottom-4 right-4 flex'>
          <Link to='/contacts'>
            <Button icon={() => <RiContactsBook3Fill />} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
