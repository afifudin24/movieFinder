/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Page/Home';
import Favorite from './components/Page/Favorite';
import MovieDetail from './components/MovieDetail';
import { BrowserRouter } from 'react-router-dom';
function App() {
   const [movieWatchlist, setMovieWatchlist] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('movieWatchlist'));
    console.log(data);
    // setMovieWatchlist(data);
  }, [])
  return (
    <Router>
    <div className="grid grid-cols-1 overflow-hidden md:grid-cols-[20%_80%] h-screen">
    <aside className="absolute -translate-x-96 w-1/2 md:w-full z-50 md:translate-x-0 md:static md:block bg-bgSidebar p-4 h-screen">
      {/* Konten Sidebar */}
     <Sidebar />
    </aside>
        <main className="bg-black overflow-y-scroll">
          <div className='bg-bgMain p-4 min-h-full w-full'
          >

          <Routes>
            {/*Rute untuk home */}
            <Route path='/' element={<Home />} />
            {/* Rute untuk watchlist */}
              <Route path='/favorites' element={<Favorite />} />
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Rute untuk detail film */}
          </Routes>
          </div>
    </main>
  </div>
    </Router>
  )
}

export default App
