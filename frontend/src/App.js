import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DayPage from './pages/DayPage';
import ContactsPage from './pages/ContactsPage';


function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/Calendar'>
      <Link to='/'><h1 className="mt-2 text-4xl text-center font-bold">
        My Calendar!
      </h1></Link>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/day/:giorno' element={<DayPage/>}></Route>
        <Route path='/contacts' element={<ContactsPage/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
