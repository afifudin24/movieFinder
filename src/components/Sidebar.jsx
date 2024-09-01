import React from "react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-full">
            <h2 className="text-sm sm:text-md lg:text-2xl xl:text-4xl md:text-xl shadow-sm font-archivo font-bold my-3 text-start text-secondary w-full md:11/12 lg:w-11/12 xl:w-10/12 mx-auto">MovieFinder</h2>
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

            </div>
        </div>
    )
}


export default Sidebar;