import React from 'react'
import Calendar from '../components/Calendar'

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold underline">
        My Calender!
      </h1>
      <div className='bg-blue-600 h-screen w-screen items-center'>
        <Calendar />
      </div>
    </div>
  )
}

export default HomePage