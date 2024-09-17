import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import SideWatchlist from "./SideWatchlist";
const Sidebar = () => {
    const location = useLocation();
      const [watchList, setWatchList] = useState([]);

  // Ambil watchList dari localStorage ketika aplikasi pertama kali dimuat
  useEffect(() => {
    const storedWatchList = localStorage.getItem('watchList');
    console.log(storedWatchList)
    if (storedWatchList) {
      console.log('Local storage found:', storedWatchList); // Log ini membantu kita memeriksa data yang ada di localStorage
      setWatchList(JSON.parse(storedWatchList));
      console.log(watchList);
    } else {
      console.log('No watchList found in localStorage'); // Ini akan menampilkan pesan jika tidak ada data di localStorage
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    return (
        <div className="w-full">
            <h2 className="text-xl sm:text-md lg:text-2xl xl:text-4xl md:text-xl shadow-sm font-archivo font-bold my-3 text-start text-secondary w-full md:11/12 lg:w-11/12 xl:w-10/12 mx-auto">MovieFinder</h2>
            <div className="sideMenu text-text font-lato text-sm   lg:text-base xl:text-lg md:text-base shadow-sm font-light text-start w-full md:11/12 lg:w-11/12 xl:w-10/12 mx-auto my-4  ">
                <Link
                    to="/"
                    className={`w-full my-3 flex flex-row hover:bg-bgActive rounded-sm duration-100 transition-all gap-3 px-3 text justify-start items-center p-2 ${location.pathname === '/' ? 'bg-bgActive rounded-sm' : ''}`}
                >
                    <i className="fas fa-home"></i> <span>Home</span>
                </Link>
                <Link
                    to="/favorites"
                    className={`w-full my-3 flex px-3 hover:bg-bgActive rounded-sm flex-row gap-3 text duration-100 transition-all justify-start items-center p-2 ${location.pathname === '/favorites' ? 'bg-bgActive rounded-sm' : ''}`}
                >
                    <i className="fa fa-heart"></i> <span>Favorite</span>
                </Link>
              

                <ModalLayout watchList={watchList} setWatchList={setWatchList} />

                <div className="p-1">
                    <h3 className="text-left my-3 font-semibold underline underline-offset-8">My Watchlist</h3>
                </div>

                <SideWatchlist watchList={watchList} setWatchList={setWatchList} />
            </div>
        </div>
    )
}


export default Sidebar;