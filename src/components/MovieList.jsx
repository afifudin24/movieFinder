import { useState, useEffect, useRef } from "react";

import MovieCard from "./MovieCard";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fade from 'react-reveal/Fade';
import { getPopularFilm, searchMovie } from "../function/Method";
import { getGenre } from "../function/Method";
import { getMovieByGenre } from "../function/Method";
import ModalAddWatchlist from "./ModalAddWatchlist";
import { Alert } from "@mui/material";
const MovieList = () => {
    const [buka, setBuka] = useState(false);
    const handleOpen = () => setBuka(true);
    const debounceTimeoutRef = useRef(null);
    const [genres, setGenres] = useState([]);
    const [genreSelect, setGenreSelect] = useState('');
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem('page');
        return savedPage ? parseInt(savedPage) : 1;
    });
    const [selectedMovie, setSelectedMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [searchQuery, setSearchQuery] = useState(() => {
        const savedQuery = localStorage.getItem('searchQuery');
        return savedQuery || '';
    });
    const [search, setSearch] = useState(() => {
        const savedQuery = localStorage.getItem('search');
        return savedQuery || ''
    });
     const latestSearch = useRef(search);
    const [favoriteMovie, setFavoriteMovie] = useState([]);
    // useEffect(() => {
    //     localStorage.setItem('searchQuery', searchQuery);
      
    // }, [searchQuery]);


    // Fungsi untuk fetch film berdasarkan genre dan halaman
       useEffect(() => {
        latestSearch.current = search;
    }, [search]);
     const fetchFilm = async () => {
        setIsLoading(true);
             console.log("lah", latestSearch.current);
             console.log("kocak");
        try {
            if (latestSearch.current) {
                const response = await searchMovie(latestSearch.current, page);
                setMovie(response.results);
            } else if (genreSelect) {
                console.log(genreSelect);
                const response = await getMovieByGenre(genreSelect, page);
                setMovie(response.results);
            } else {
                const response = await getPopularFilm(page);
                setMovie(response.results);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        
        fetchFilm();
    }, [page, genreSelect]);

    const handleSearch = (event) => {
        setGenreSelect('');
        const cari = event.target.value;
        setSearch(cari);
        
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        
        debounceTimeoutRef.current = setTimeout(async () => {
            const currentSearch = latestSearch.current;
            localStorage.setItem('search', currentSearch);
            console.log(currentSearch);
            if (currentSearch.trim().length > 0) {
                console.log("kok bisa")
                setIsLoading(true);
                try {
                    const response = await searchMovie(currentSearch, page);
                    setMovie(response.results);
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                }
            } else {
                console.log("Ini ", latestSearch);
                await fetchFilm(); // Jika input kosong, kembalikan ke film populer atau genre
            }
        }, 300); // Menunggu 1 detik setelah mengetik
    };
        

    useEffect(() => {
        const getGenreList = async () => {
            try {
                const response = await getGenre();
                setGenres(response.genres);
            } catch (err) {
                console.log(err);
            }
        }
        getGenreList();
        const favmov = JSON.parse(localStorage.getItem('favMovie'));
        setFavoriteMovie(favmov || []);
    }, []);

    const [enhancedMovieList, setEnhancedMovieList] = useState([]);

    useEffect(() => {
        const updateEnhancedMovieList = movie.map(m => {
            const isFavorite = favoriteMovie.some(fav => fav.movie_id === m.id);
            return { ...m, fav: isFavorite };
        });
        setEnhancedMovieList(updateEnhancedMovieList);
    }, [favoriteMovie, movie]);

    const changePage = (direction) => {
        setPage((prev) => {
            const newPage = direction === 'next' ? prev + 1 : (prev > 1 ? prev - 1 : prev);
            localStorage.setItem('page', newPage);
            return newPage;
        });
    };

    const handleChange = (event) => {
        setGenreSelect(event.target.value);
        setPage(1); // Reset halaman ketika genre berubah
    };

    return (
        <div className="mt-5 h-full">
            <div className="cari gap-2 w-full flex justify-between font-lato">
                <input
                    onChange={handleSearch}
                    value={search}
                    placeholder="Search Movie ..."
                    className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain"
                />
                <div className="flex flex-row gap-1 items-center">
                    <div className="h-full bg-slate-100 rounded-md">
                        <FormControl
                            sx={{
                                minWidth: 100,
                                height: '100%'
                            }}
                            className="h-full"
                            size="small"
                        >
                            <InputLabel id="demo-select-small-label">Genre</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={genreSelect}
                                label="Genre"
                                className="text-white"
                                onChange={handleChange}
                                sx={{
                                    height: '100%',
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {genres.length > 0 ? (
                                    genres.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    ))
                                ) : null}
                            </Select>
                        </FormControl>
                    </div>
                    <span className="bg-bgActive text-xs md:text-base block h-full text-center p-3 rounded-md font-semibold text-white">
                        Page {page}
                    </span>
                </div>
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