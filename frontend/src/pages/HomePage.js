import React from 'react'
import Calendar from '../components/Calendar'

function HomePage() {
  return (
    <div className='relative'>
      <div className='h-screen w-screen items-center'>
        <Calendar />
        <div className='fixed bottom-4 right-4 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl  hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => (true)}
                >
                    &gt;
                </div>
            </div>
      </div>
    </div>
  )
}

export default HomePage