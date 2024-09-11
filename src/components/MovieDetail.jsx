/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGenre } from '../function/Method';


const MovieDetail = () => {
    const location = useLocation();
    const { img, judul, item } = location.state || {}; // Mengambil data dari state
    console.log(item);
    const genreIds = item.genre_ids;
    const [genres, setGenres] = useState([]);
    const [genreMap, setGenreMap] = useState(new Map());
     const [filteredGenreNames, setFilteredGenreNames] = useState([]);
    useEffect(() => {
        const getGenrez = async () => {
            try {
                const response = await getGenre();
                setGenres(response.genres);
                console.log(response.genres);
                  const map = new Map(response.genres.map(genre => [genre.id, genre.name]));
                setGenreMap(map);
                 const names = genreIds
          .map(id => map.get(id))
                    .filter(name => name !== undefined);
                const genreString = names.join(', ');
        setFilteredGenreNames(genreString);

            } catch (err) {
                console.log(err)
            }
        };
        getGenrez();
        console.log("ini", genres);
    }, [])
    return (
      <div className='w-11/12 mx-auto mt-5'>
            <div className='md:float-left md:mr-5  text-text'>
                <div className='w-60'>
                <img  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='w-full object-cover rounded-sm shadow-md' alt={judul} />
                </div>
                <div className='w-12/12'>
                </div>
            </div>
            
            <div className='w-12/12 mx-3 my-3 md:my-0  text-justify text-slate-200'>
                <h1 className='md:text-3xl font-semibold text-left my-2 text-2xl font-lato'>{item.title}</h1>
                <h3 className='my-1 font-lato text-lg'><i className="text-yellow-400 fas fa-star mx-1"></i>{item.vote_average}</h3>
           <table className="divide-y   font-lato divide-gray-900">
  
    <tbody className="divide-y divide-gray-400">
     
    
                      <tr className=''>
  <td className="py-2 pr-2 whitespace-nowrap">Original Title</td>
  <td className="py-2 px-1 w-1 text-center">:</td> {/* Width set for the colon */}
  <td className="py-2 pl-2 whitespace-normal text-left md:whitespace-nowrap">{item.original_title}</td>
</tr>
<tr className=''>
  <td className="py-2 pr-2 whitespace-nowrap">Release Date</td>
  <td className="py-2 px-1 w-1 text-center">:</td>
  <td className="py-2 pl-2 whitespace-normal text-left md:whitespace-nowrap">{item.release_date}</td>
</tr>
<tr className=''>
  <td className="py-2 pr-2 whitespace-nowrap">Original Language</td>
  <td className="py-2 px-1 w-1 text-center">:</td>
  <td className="py-2 pl-2 whitespace-normal text-left md:whitespace-nowrap">{item.original_language}</td>
</tr>
<tr className=''>
  <td className="py-2 pr-2 whitespace-nowrap">Popularity</td>
  <td className="py-2 px-1 w-1 text-center">:</td>
  <td className="py-2 pl-2 whitespace-normal text-left md:whitespace-nowrap">{item.popularity}</td>
</tr>
<tr className=''>
  <td className="py-2 pr-2 whitespace-nowrap">Genre</td>
  <td className="py-2 px-1 w-1 text-center">:</td>
  <td className="py-2 pl-2 whitespace-normal md:whitespace-nowrap">{filteredGenreNames || 'No genres available'}</td>
</tr>

    </tbody>
                </table>
                <p className='my-2 text-justify font-lato'>
                    {item.overview}
                </p>
            </div>

      </div>

    
    );
};

export default MovieDetail;