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
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/day/:data/' element={<DayPage />}></Route>
          <Route path='/contacts' element={<ContactsPage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
