import { useState, useEffect, useRef } from "react";

import MovieCard from "./MovieCard";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Fade from 'react-reveal/Fade';
import { getPopularFilm, searchMovie } from "../function/Method";
import ModalAddWatchlist from "./ModalAddWatchlist";

const MovieList = () => {
    const [buka, setBuka] = useState(false);
    const handleOpen = () => setBuka(true);
    const debounceTimeoutRef = useRef(null);
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem('page');
        return savedPage ? parseInt(savedPage) : 1;
    });
    const [selectedMovie, setSelectedMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Untuk menyimpan nilai pencarian
    const [favoriteMovie, setFavoriteMovie] = useState([]);

    // Fungsi untuk fetch film populer
    const fetchFilm = async () => {
        setIsLoading(true);
       try {
        if (searchQuery) {
            // Jika ada searchQuery, fetch hasil pencarian berdasarkan query dan page
            const response = await searchMovie(searchQuery, page);
            setMovie(response.results);
            console.log('ini',response.results);
        } else {
            // Jika tidak ada searchQuery, fetch film populer berdasarkan page
            const response = await getPopularFilm(page);
            setMovie(response.results);
        }
        setIsLoading(false);
    } catch (err) {
        console.log(err);
        setIsLoading(false);
    }
    };

    // Panggil fetchFilm setiap kali halaman berubah
    useEffect(() => {
      
            fetchFilm();
        
    }, [page, searchQuery]);

    // Fungsi pencarian
    const handleSearch = (event) => {
        const search = event.target.value;
        setSearchQuery(search);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set timeout baru untuk memanggil searchMovie setelah 1 detik
        debounceTimeoutRef.current = setTimeout(async () => {
            if (search.trim().length > 0) {
                setIsLoading(true);
                try {
                    const response = await searchMovie(search, page);
                    setMovie(response.results); // Update daftar film dengan hasil pencarian
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                }
            } else {
                fetchFilm(); // Jika input kosong, kembalikan ke film populer
            }
        }, 1000); // Menunggu 1 detik setelah mengetik
    };

    // Mengambil daftar film favorit dari localStorage
    useEffect(() => {
        const favmov = JSON.parse(localStorage.getItem('favMovie'));
        setFavoriteMovie(favmov || []);
    }, []);

    // Menggabungkan status favorite ke dalam daftar movie
    const [enhancedMovieList, setEnhancedMovieList] = useState([]);

    useEffect(() => {
        const updateEnhancedMovieList = movie.map(m => {
            const isFavorite = favoriteMovie.some(fav => fav.judul_id === m.id);
            return { ...m, fav: isFavorite };
        });
        setEnhancedMovieList(updateEnhancedMovieList);
    }, [favoriteMovie, movie]);

    // Fungsi untuk mengganti halaman
    const changePage = (direction) => {
        setPage((prev) => {
            const newPage = direction === 'next' ? prev + 1 : (prev > 1 ? prev - 1 : prev);
            localStorage.setItem('page', newPage);
            return newPage;
        });
    };

    return (
        <div className="mt-5 h-full">
            <div className="cari gap-2 w-full flex justify-between font-lato">
                <input 
                    onKeyUp={handleSearch} 
                    placeholder="Search Movie ..." 
                    className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain" 
                />
                <span className="bg-bgActive text-center p-3 rounded-md font-semibold text-white">
                    Page { page}
                </span>
            </div>
            <div className="my-5 text-text">
                <h3 className="text-xl">
                    {searchQuery ? "Search Results" : "Popular Movies Right Now"}
                </h3>
            </div>

            {
                isLoading ? (
                    <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-12 md:gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
                        {Array(12).fill().map((_, index) => (
                            <SkeletonTheme key={index} baseColor="#202020" highlightColor="#444">
                                <div className="min-h-80 lg:min-h-96 relative bg-zinc-800 duration-100 transition-all rounded-sm">
                                    <div className="cursor-pointer heroImage lg:h-56 h-40 w-full ">
                                        <Skeleton height="100%" width="100%" />
                                    </div>
                                    <div className="p-2">
                                        <Skeleton height={20} width="70%" />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        ))}
                    </div>
                ) : (
                    enhancedMovieList.length > 0 ? (
                        <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-12 md:gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
                            {enhancedMovieList.map((item, index) => (
                                <div key={index}>
                                    <Fade delay={(index + 1) * 100} bottom>
                                        <MovieCard 
                                            favoriteMovie={favoriteMovie} 
                                            setFavoriteMovie={setFavoriteMovie} 
                                            fav={item.fav} 
                                            item={item} 
                                            selectedMovie={selectedMovie} 
                                            setSelectedMovie={setSelectedMovie} 
                                            handleOpen={handleOpen} 
                                            movie={movie} 
                                            judul={item.original_title}  
                                            index={index} 
                                        />
                                    </Fade>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No Movies Found</div>
                    )
                )
            }

            <ModalAddWatchlist buka={buka} movie={selectedMovie} setBuka={setBuka} />

            <div className="flex my-2 w-full py-4 flex-row justify-between">
                <button 
                    onClick={() => changePage('prev')} 
                    className={`p-2 rounded-md bg-secondary hover:bg-secondaryHover duration-100 transition-all text-text ${page === 1 ? 'hidden' : ''} font-lato font-semibold`}
                >
                    <i className="fas mx-1 fa-chevron-left"></i> Prev
                </button>
                <button 
                    onClick={() => changePage('next')} 
                    className="self-end ml-auto p-2 rounded-md bg-secondary hover:bg-secondaryHover duration-100 transition-all text-text font-lato font-semibold"
                >
                   Next <i className="fas mx-1 fa-chevron-right"></i> 
                </button>
            </div>
        </div>
    );
};

export default MovieList;
