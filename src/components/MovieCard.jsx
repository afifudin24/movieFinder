/* eslint-disable react/prop-types */
 
import { Link } from "react-router-dom";
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
const MovieCard = ({ setFavoriteMovie, favoriteMovie ,fav, item, movie, index, img, judul, handleOpen, selectedMovie,  setSelectedMovie }) => {
    const date = item.release_date;
    const select = (data) => {
        handleOpen();
        setSelectedMovie(data);
        console.log(data);
        console.log(selectedMovie)
    }

   const addFavorite = () => {
    setFavoriteMovie(prev => {
        // Cek apakah judul_id sudah ada di favoriteMovie
        console.log(prev);
        const isAlreadyFavorite = prev.some(fav => fav.movie_id === item.id);
        
        let updateFavMovie;
        console.log(isAlreadyFavorite);
        
        if (isAlreadyFavorite) {
            // Jika sudah ada, hapus dari favoriteMovie
            updateFavMovie = prev.filter(fav => fav.movie_id !== item.id);
            
        } else {
            // Jika belum ada, tambahkan ke favoriteMovie
            const fav = {
                id: Date.now(),
                movie_id: item.id
            };
            updateFavMovie = [...prev, fav];
        }

        // Simpan updateFavMovie ke localStorage
        localStorage.setItem('favMovie', JSON.stringify(updateFavMovie));
        console.log('KOK', updateFavMovie);
        return updateFavMovie;
    });
     
}
     
    return (
         <div 
          
            className="min-h-80  lg:min-h-96 relative bg-zinc-800   duration-100 transition-all rounded-sm"
        >
            <div className="absolute top-0 left-0">
                <span onClick={() => select(item)} className="inline-block p-1 cursor-pointer hover:bg-slate-600 opacity-70 bg-black outline-1 outline outline-white rounded-sm">
                    <i className="fas fa-plus"></i>
                </span>
            </div>
            <div className="cursor-pointer heroImage lg:h-56 h-40 w-full bg-slate-400">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="h-full object-cover w-full" alt={judul} />
            </div>
            <div className="p-2">
                <div className="flex mb-1 justify-between  items-center ">
                    {fav == "kosong" ? '' : (
                    <div className="cursor-pointer">
                    <i onClick={addFavorite} className={`fa text-lg fa-heart ${fav ? 'text-red-600' : 'text-gray-400'} hover:text-red-600 duration-100 transition-all`}></i>
                    </div>
                    )}
                    <div className="text-xs font-light">
                       <i className="text-yellow-400 fas fa-star mx-1"></i>
                        {item.vote_average}
                </div>
                </div>
                <p className="text-sm my-1">{item.title}</p>
                <p className="text-xs font-light">
  {date}
</p>

                <Link
                    className="transition-all"
            to={`/movie/${item.id}`}
            state={{ img, judul, item }}>
                <button className="hover:shadow-slate-500 hover:shadow-md outline-none duration-100  text-xs my-2 p-2 font-lato rounded-sm bg-secondary">Detail</button>
                </Link>
            </div>
        </div>
    )
}
export default MovieCard;