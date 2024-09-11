import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovie } from "../../function/Method"; // Pastikan getMovie adalah fungsi yang Anda buat untuk mengambil data film
const MovieWatchList = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const [watchList, setWatchList] = useState([]);
    const [movies, setMovies] = useState([]);
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
        <div className="text-white">
            <h1>Watchlist: {item?.watchlist}</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id}>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
