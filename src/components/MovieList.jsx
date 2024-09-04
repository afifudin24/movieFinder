import { useState, useEffect } from "react";
import image from '../../public/image.jpeg'
import MovieCard from "./MovieCard";
import ModalAddWatchlist from "./ModalAddWatchlist";
const MovieList = () => {
    const [buka, setBuka] = useState(false);
    const handleOpen = () => setBuka(true);
    const [selectedMovie, setSelectedMovie] = useState({});
    useState(() => {
        console.log(selectedMovie);
    })
    const [movie, setMovie] = useState([
        {
            id: 1,
            judul: "iniJudul"
        },
        {
            id: 2,
            judul: "iniJudul"
        },
        {
            id: 3,
            judul: "iniJudul"
        },
        {
            id: 4,
            judul: "iniJudul"
        },
        {
            id: 5,
            judul: "iniJudul"
        },
        {
            id: 6,
            judul: "iniJudul"
        },
        {
            id: 7,
            judul: "iniJudul"
        },
    ]);
    const [favoriteMovie, setFavoriteMovie] = useState([
        {
            id: 1,
            judul_id: 2
        }
    ]);

         const [enhancedMovieList, setEnhancedMovieList] = useState([]);

    // Perbarui enhancedMovieList setiap kali favoriteMovie atau movie berubah
    useEffect(() => {
        console.log(favoriteMovie);
        const updateEnhancedMovieList = movie.map(m => {
            const isFavorite = favoriteMovie.some(fav => fav.judul_id === m.id);
            return { ...m, fav: isFavorite };
        });
        setEnhancedMovieList(updateEnhancedMovieList);
    }, [favoriteMovie, movie]);
    return (
        <div className="mt-5">
            <div className="cari w-full font-lato">
            <input  placeholder="Search Movie ..." className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain" />
            </div>
            <div className="my-5 text-text"><h3 className="text-xl">Popular Movies Right Now</h3></div>
                {
                    enhancedMovieList.length > 0 ? (
                    <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6"> {
                        enhancedMovieList.map((item , index) => (
                            (
                               <MovieCard setFavoriteMovie={setFavoriteMovie} fav={item.fav} item={item} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} handleOpen={handleOpen} movie={movie} key={index} judul={item.judul} img={image} index={index}  />
                            )
                        ))
                    }
            </div>
                    ): (
                            <div>Tidak Ada Data</div>
                            
                    )
                    
            }

            <ModalAddWatchlist buka={buka} movie={selectedMovie} setBuka={setBuka} />

        </div>
    )
}

export default MovieList;