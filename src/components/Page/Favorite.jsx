import { useState } from "react";
import MovieCard from "../MovieCard";
import image from '/image.jpeg';
const Favorite = () => {
      const [movie, setMovie] = useState([
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
    ]) 
    return (
       <div className="mt-5 w-11/12 mx-auto">
            <div className="cari w-full font-lato">
            <input  placeholder="Search Movie ..." className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain" />
            </div>
            <div className="my-5 text-text"><h3 className="text-xl">My Favorite Movies</h3></div>
                {
                    movie.length > 0 ? (
                    <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6"> {
                        movie.map((item , index) => (
                            (
                               <MovieCard movie={movie} key={index} judul={item.judul} img={image} index={index}  />
                            )
                        ))
                    }
            </div>
                    ): (
                            <div>Tidak Ada Data</div>
                            
                    )
                    
            }

        </div>
    );
}
export default Favorite;