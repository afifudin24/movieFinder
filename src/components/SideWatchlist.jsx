import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideWatchlist = ({ watchList, setWatchList }) => {
    const [movieWatchlist, setMovieWatchlist] = useState([]);
    const [editMode, setEditMode] = useState(false); // State untuk kontrol mode edit
    const [editItem, setEditItem] = useState(null); // State untuk menyimpan item yang sedang diedit
    const [editText, setEditText] = useState(''); // State untuk menyimpan nilai input edit
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('movieWatchlist'));
        if (data) {
            setMovieWatchlist(data);
            console.log("Ini gan", data);
        } else {
            console.log("Tidak Ada Data");
        }
    }, [setWatchList]);

    const deleteWatchlist = (idToRemove) => {
        const updatedWatchList = watchList.filter(item => item.id !== idToRemove);
        const updatedMovieWatchlist = movieWatchlist.filter(item => item.watchlist_id !== idToRemove);

        setWatchList(updatedWatchList);
        setMovieWatchlist(updatedMovieWatchlist);

        localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
        localStorage.setItem('movieWatchlist', JSON.stringify(updatedMovieWatchlist));

        console.log('Updated watchlist after removal:', updatedWatchList);
        console.log('Updated movieWatchlist after removal:', updatedMovieWatchlist);

        navigate('/');
    };

    const startEdit = (item) => {
        setEditItem(item);
        setEditText(item.watchlist);
        setEditMode(true);
    };

    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedWatchList = watchList.map(item => 
            item.id === editItem.id ? { ...item, watchlist: editText } : item
        );
        const updatedMovieWatchlist = movieWatchlist.map(item => 
            item.watchlist_id === editItem.id ? { ...item, watchlist: editText } : item
        );

        setWatchList(updatedWatchList);
        setMovieWatchlist(updatedMovieWatchlist);
        localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
        localStorage.setItem('movieWatchlist', JSON.stringify(updatedMovieWatchlist));

        console.log('Updated watchlist after edit:', updatedWatchList);
        console.log('Updated movieWatchlist after edit:', updatedMovieWatchlist);

        setEditMode(false);
        setEditItem(null);
        setEditText('');
    };

    return (
        <div className="flex flex-col gap-1 my-1">
            {editMode && editItem && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 w-10/12 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
                    <h3 className="text-gray-950 my-1">Edit Watchlist</h3>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            value={editText}
                            onChange={handleEditChange}
                            className="border p-2 my-1 rounded w-full text-gray-800"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded mt-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            {watchList.length > 0 ? (
                watchList.map((item, index) => (
                    <div
                        key={index}
                        className="px-2 flex justify-between my-1 py-1 rounded-md shadow-sm cursor-pointer shadow-slate-800 bg-slate-950 hover:bg-slate-900 duration-100 transition-all"
                    >
                        <Link className="w-9/12" to={`/moviewatchlist/${item.id}`} state={{ item }}>
                            <h4 className="text-left ">
                                <i className="fa fa-bookmark mx-1"> </i> {item.watchlist}
                            </h4>
                        </Link>
                        <div className="flex w-3/12">
                            <button
                                className="hover:text-yellow-300 duration-100 transition-all"
                                onClick={() => startEdit(item)}
                            >
                                <i className="fa fa-edit mx-1"> </i>
                            </button>
                            <button
                                className="hover:text-secondary duration-100 transition-all"
                                onClick={() => deleteWatchlist(item.id)}
                            >
                                <i className="fa fa-trash mx-1"> </i>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-left p-2">No items in the watchlist.</div>
            )}
        </div>
    );
};

export default SideWatchlist;
