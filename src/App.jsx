/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Page/Home';
import Favorite from './components/Page/Favorite';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="grid grid-cols-1 md:grid-cols-[20%_80%] h-screen">
    <aside className="hidden md:block bg-bgSidebar p-4 h-screen">
      {/* Konten Sidebar */}
     <Sidebar />
    </aside>
        <main className="bg-black">
          <div className='bg-bgMain p-4 h-full w-full'
          >

          <Routes>
            {/*Rute untuk home */}
            <Route path='/' element={<Home />} />
            {/* Rute untuk watchlist */}
            <Route path='/favorites' element={<Favorite />} />
          </Routes>
          </div>
    </main>
  </div>
    </Router>
  )
}

export default App
