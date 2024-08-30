import { useState } from "react";
import image from '../../public/image.jpeg'
const MovieList = () => {
    const [movie, setMovie] = useState([
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
        {
            judul : "iniJudul"
        },
    ]) 
    return (
        <div className="mt-5">
            <div className="cari w-full font-lato">
            <input  placeholder="Search Movie ..." className="text-white focus:outline-white w-full md:w-7/12 p-2 rounded-sm bg-transparent outline outline-1 outline-bgMain" />
            </div>
            <div className="my-5 text-text"><h3 className="text-xl">Popular Movies Right Now</h3></div>
                {
                    movie.length > 0 ? (
                    <div className="grid text-text font-lato my-2 grid-cols-3 w-full gap-7 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"> {
                        movie.map((item , index) => (
                            (
                                <div key={index} className="h-64 bg-zinc-800 rounded-sm">
                                    <div className="heroImage h-40 w-full bg-slate-400" >
                                        <img src={image} className="h-full object-cover w-full" />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-right  text-xs font-light">8.0</p>
                                        <p className="text-sm">{item.judul}</p>
                                        <p className="text-sm font-light">(2024)</p>
                                    </div>
                                </div>
                            )
                        ))
                    }
            </div>
                    ): (
                            <div>Tidak Ada Data</div>
                    )
                    
            }

        </div>
    )
}

export default MovieList;