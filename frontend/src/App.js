import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './components/Calendar';
import HomePage from './pages/HomePage';
import DayPage from './pages/DayPage';


function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/Calendar'>
      
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/day/:giorno' element={<DayPage/>}></Route>

      </Routes>
      
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
