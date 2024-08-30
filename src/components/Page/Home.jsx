/* eslint-disable no-unused-vars */
import React from "react";
import MovieList from "../MovieList";
const Home = () => {
  return (
    <div className="w-11/12  mx-auto">
      <div className="rounded-md  shadow-sm shadow-secondary text-text font-lato my-2 mx-auto bg-bgActive p-3">
          <h2 className="text-2xl md:text-3xl">Welcome to  <span className="text-secondary">MovieFinder</span></h2>
          <p className="my-2 font-lato text-base">Browse movies, add them to watchlists or favorites and share them with friends.</p>
          <p className="my-2 font-lato text-base">Just click the <span className="inline-block p-2 mx-1 bg-black outline-1 outline outline-white rounded-sm"><i className="fas fa-plus"></i></span> for add to watchlists or click <span className="inline-block p-2 mx-1 bg-black outline-1 outline outline-white rounded-sm"><i className="fa fa-heart"></i></span> for favorite  </p>
      </div>
      <MovieList />
    </div>
  )
}

export default Home;