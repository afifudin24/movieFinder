/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './index.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Page/Home';
import Favorite from './components/Page/Favorite';
import MovieDetail from './components/MovieDetail';
import MovieWatchList from './components/Page/MovieWatchList';
import ManageWatchlist from './components/Page/ManageWatchlist';

import { getPopularFilm } from './function/Method';
import { BrowserRouter } from 'react-router-dom';
function App() {
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [isSide, setIsSide] = useState(false);
  const handleSide = () => {
    setIsSide(!isSide);
  }
  
  useEffect(() => {
  
    // console.log(popularFilm);
    const data = JSON.parse(localStorage.getItem('movieWatchlist'));
    console.log(data);
    setMovieWatchlist(data);
  }, [])
  return (
    <Router>
      <div className="grid  grid-cols-1 overflow-hidden md:grid-cols-[20%_80%] h-screen">
        <div onClick={handleSide} className='flex z-50 bg-secondary hover:bg-secondaryHover duration-100 transition-all md:hidden justify-center items-center text-text top-5 rounded-md right-5 absolute w-10 h-10'>
          {isSide ? (
              <i className="fas text-xl fa-times"></i>
          ): 
              <i className="fas text-xl fa-bars"></i>
            } 
        </div>
    <aside className={`absolute transition-all  duration-300 ${isSide ? '-translate-x-0' : '-translate-x-96'} w-1/2 md:w-full z-50 md:translate-x-0 md:static md:block bg-bgSidebar p-4 h-screen`}
>
      {/* Konten Sidebar */}
     <Sidebar />
    </aside>
        <main className="bg-gray-900 overflow-y-scroll min-h-screen">
          
          <Routes>
            {/*Rute untuk home */}
            <Route path='/' element={<Home />} />
            {/* Rute untuk watchlist */}
              <Route path='/favorites' element={<Favorite />} />
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Rute untuk detail film */}
              <Route path="/moviewatchlist/:id" element={<MovieWatchList />} /> {/* Rute untuk detail film */}
             
              
          </Routes>
          
    </main>
  </div>
    </Router>
  )
}

export default App
