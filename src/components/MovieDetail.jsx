import React from 'react';
import { useLocation } from 'react-router-dom';

const MovieDetail = () => {
    const location = useLocation();
    const { img, judul, movie } = location.state || {}; // Mengambil data dari state
    console.log(movie);
    return (
        <div className='flex flex-col gap-2 p-2'>
            <div className='flex flex-row gap-2 text-text'>
                <div className='w-4/12 p-2'>
            <img src={img} className='w-full object-cover' alt={judul} />
                </div>
                <div className='w-6/12'>
                    <h1 className='text-3xl '>{judul}</h1>
                </div>
            </div>
            
            <div className='w-12/12 text-justify text-slate-200'>
                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Semper at vehicula laoreet; finibus interdum rutrum? Dapibus enim platea ex posuere integer venenatis lectus nullam himenaeos. Sit at donec fusce malesuada efficitur volutpat aenean aenean. Malesuada efficitur ante arcu ridiculus ornare etiam diam. Id cursus diam mattis posuere sagittis ornare libero hac semper. Sollicitudin platea nullam class maecenas integer ad magna venenatis.

Luctus class elementum cras morbi eros, libero dis natoque. Hac taciti morbi ultrices himenaeos sem finibus vivamus. Cursus netus torquent lobortis iaculis facilisi potenti ante. Phasellus velit vivamus feugiat sed eu turpis enim. Cubilia egestas dui fusce habitant magnis vel consectetur. Mollis dictum hac praesent adipiscing per dolor. Nullam curabitur cras mus dignissim quis fames. Est dui venenatis habitasse interdum blandit eu. Massa facilisi auctor platea fringilla mauris leo aptent finibus. Bibendum eleifend ex sit scelerisque est neque viverra fringilla.</p>
            </div>
            {/* Tampilkan detail film lainnya */}
        </div>
    );
};

export default MovieDetail;