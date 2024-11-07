import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DayPage from './pages/DayPage';
import ContactsPage from './pages/ContactsPage';
import {  CiCalendarDate } from "react-icons/ci";


function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/Calendar'>
        <Link to='/'>
          <div className='flex items-center justify-center gap-x-2'>
            <CiCalendarDate size={70} />
            <h1 className="mt-2 text-4xl text-center font-bold">
              My Agenda
            </h1>
          </div>
        </Link>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/day/:giorno/:data' element={<DayPage />}></Route>
          <Route path='/contacts' element={<ContactsPage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
