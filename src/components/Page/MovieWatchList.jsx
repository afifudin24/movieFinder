import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../MovieCard";
import { getMovie } from "../../function/Method"; // Pastikan getMovie adalah fungsi yang Anda buat untuk mengambil data film
import { Fade } from "react-reveal";

const MovieWatchList = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const [watchList, setWatchList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [favoriteMovie, setFavoriteMovie] = useState([]);
      const [buka, setBuka] = useState(false);
     const handleOpen = () => setBuka(true);

 const [selectedMovie, setSelectedMovie] = useState({});
    const idWatchlist = item?.id;

    useEffect(() => {
        if (!idWatchlist) return; // Hentikan jika idWatchlist tidak tersedia

        // Ambil data dari localStorage
        const data = JSON.parse(localStorage.getItem('movieWatchlist'));
        
        if (data) {
            // Filter data berdasarkan idWatchlist
            const filtered = data.filter(movie => movie.watchlist_id === idWatchlist);
            console.log("Filtered data:", filtered);

            // Ambil detail film untuk setiap ID film yang terfilter
            const fetchMovies = async () => {
                try {
                    const movieDetails = await Promise.all(
                        filtered.map(movie => getMovie(movie.movie_id)) // Ganti movie_id dengan nama kunci yang sesuai
                    );
                    setMovies(movieDetails);
                } catch (error) {
                    console.error("Error fetching movie details:", error);
                }
            };

            fetchMovies();
        } else {
            console.log("tidak ada data");
        }
    }, [idWatchlist]); // Tambahkan idWatchlist sebagai dependensi useEffect

    return (
        <div className="text-white py-3  w-11/12 mx-auto">
            <h1 className="text-2xl font-lato my-2 mb-5">Watchlist: {item?.watchlist}</h1>
             <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-12 md:gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
                {movies.length > 0 ? (
                    movies.map((item, index) => (
                          <div key={index}>
                                    <Fade delay={(index + 1) * 100} bottom>
                                <MovieCard 

                                            favoriteMovie={favoriteMovie} 
                                            setFavoriteMovie={setFavoriteMovie} 
                                            fav={'kosong'} 
                                            item={item} 
                                            selectedMovie={selectedMovie} 
                                            setSelectedMovie={setSelectedMovie} 
                                            handleOpen={handleOpen} 
                                            movie={''} 
                                            judul={item.original_title}  
                                            index={index} 
                                        />
                                    </Fade>
                                </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieWatchList;
