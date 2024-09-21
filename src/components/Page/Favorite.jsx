import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import image from '/image.jpeg';
import { Fade } from 'react-reveal';
import { getMovie } from '../../function/Method';
import ModalAddWatchlist from '../ModalAddWatchlist';
const Favorite = () => {
  const [favMovie, setFavMovie] = useState([]);
  const [movie, setMovie] = useState([]);
  const [buka, setBuka] = useState(false);
  const handleOpen = () => setBuka(true);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem('favMovie'));
    if (favMovies) {
      console.log('Ada data', favMovies);
      setFavoriteMovie(favMovies);
      const fetchMovies = async () => {
        try {
          const movieDetails = await Promise.all(
            favMovies.map((movie) => getMovie(movie.movie_id)), // Ganti movie_id dengan nama kunci yang sesuai
          );
          setMovie(movieDetails);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovies();
    } else {
      setMovie([]);
      console.log('Tidak ada data');
    }
  }, []);

  useEffect(() => {
    if (favoriteMovie.length > 0) {
      const cekMovies = async () => {
        try {
          const movieDetails = await Promise.all(
            favoriteMovie.map((movie) => getMovie(movie.movie_id)),
          );
          setMovie(movieDetails);
          console.log('Lah', movieDetails);
        } catch (err) {
          console.log(err);
        }
      };
      cekMovies();
    }
  }, [favoriteMovie]);
  return (
    <div className="mt-5 w-11/12 mx-auto">
      <div className="cari w-full font-lato">
        {/* <input  placeholder="Search Movie ..." className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain" /> */}
      </div>
      <div className="my-5 text-text">
        <h3 className="text-xl font-semibold">Favorite Movies</h3>
      </div>
      {movie.length > 0 ? (
        <div className="grid text-text font-lato my-2 grid-cols-2 sm:grid-cols-3 w-full gap-7 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {' '}
          {movie.map((item, index) => (
            <div key={index}>
              <Fade delay={(index + 1) * 100} bottom>
                <MovieCard
                  favoriteMovie={favoriteMovie}
                  setFavoriteMovie={setFavoriteMovie}
                  fav={true}
                  item={item}
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                  handleOpen={handleOpen}
                  judul={item.original_title}
                  index={index}
                />
              </Fade>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-text">Data Not Found</div>
      )}{' '}
      <ModalAddWatchlist buka={buka} movie={selectedMovie} setBuka={setBuka} />
    </div>
  );
};
export default Favorite;
