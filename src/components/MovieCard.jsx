/* eslint-disable react/prop-types */
 
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
const MovieCard = ({ setFavoriteMovie ,fav, item, movie, index, img, judul, handleOpen, selectedMovie,  setSelectedMovie }) => {
    const select = (data) => {
        handleOpen();
        setSelectedMovie(data);
        console.log(data);
        console.log(selectedMovie)
    }

    const addFavorite = () => {
        const fav = {
            id: Date.now(),
            judul_id: item.id
        };
        setFavoriteMovie(prev => {
            const updateFavMovie = [...prev, fav];
            localStorage.setItem('favMovie', JSON.stringify(updateFavMovie));
            console.log(updateFavMovie);
            return updateFavMovie;
        })

    }
    return (
         <div
          
            className="min-h-72 lg:min-h-96 relative bg-zinc-800   duration-100 transition-all rounded-sm"
        >
            <div className="absolute top-0 left-0">
                <span onClick={() => select(item)} className="inline-block p-1 cursor-pointer hover:bg-slate-600 opacity-70 bg-black outline-1 outline outline-white rounded-sm">
                    <i className="fas fa-plus"></i>
                </span>
            </div>
            <div className="cursor-pointer heroImage lg:h-56 h-40 w-full bg-slate-400">
                <img src={img} className="h-full object-cover w-full" alt={judul} />
            </div>
            <div className="p-2">
                <div className="flex mb-1 justify-between  items-center ">
                    <div className="cursor-pointer">
                    <i onClick={addFavorite} className={`fa text-lg fa-heart ${fav ? 'text-red-600' : 'text-gray-400'} hover:text-red-600 duration-100 transition-all`}></i>
                    </div>
                    <div className="text-xs font-light">
                        <Rating 
                            name="simple-controlled"
                            size="small"
                            value={"3"}
                            readOnly
                            sx={
                                {
                                    fontSize: '1rem',
                                      '& .MuiRating-iconEmpty': {
                                     display: 'none', // Sembunyikan bintang kosong
          },
                                }
                            }
                        />
                </div>
                </div>
                <p className="text-sm">{judul}</p>
                <p className="text-xs font-light">(2024)</p>
                <Link
                    className="transition-all"
            to={`/movie/${index}`}
            state={{ img, judul, movie }}>
                <button className="hover:shadow-slate-500 hover:shadow-md outline-none duration-100  text-xs my-2 p-2 font-lato rounded-sm bg-secondary">Detail</button>
                </Link>
            </div>
        </div>
    )
}
export default MovieCard;