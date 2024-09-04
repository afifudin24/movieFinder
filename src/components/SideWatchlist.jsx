/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

const SideWatchlist = ({ watchList, setWatchList }) => {
    useEffect(() => {
        // Ambil data dari localStorage saat komponen pertama kali dimuat
        const storedWatchList = localStorage.getItem('watchList');
        // if (storedWatchList) {
        //     setWatchList(JSON.parse(storedWatchList));
        // }
    }, [setWatchList]);

    const deleteWatchlist = (indexToRemove) => {
     const updatedList = watchList.filter((_, index) => index !== indexToRemove);
    setWatchList(updatedList);
    // Simpan perubahan ke localStorage
    localStorage.setItem('watchList', JSON.stringify(updatedList));
    console.log('Updated watchlist after removal:', updatedList);
    }

    return (
        <div className="flex flex-col gap-1 my-1">
            {watchList.length > 0 ? (
                watchList.map((item, index) => (
                    <div key={index} className="px-2 flex justify-between my-1 py-1 rounded-md shadow-sm cursor-pointer shadow-slate-800 bg-slate-950 hover:bg-slate-900 duration-100 transition-all">
                        <h4 className="text-left">
                            <i className="fa fa-bookmark mx-1"> </i> {item.watchlist}
                        </h4>
                        <h4 onClick={() => deleteWatchlist(index)}>
                            <i className="fa fa-trash mx-1"> </i>
                        </h4>
                    </div>
                ))
            ) : (
                <div className="text-left p-2">No items in the watchlist.</div>
            )}
        </div>
    );
}

export default SideWatchlist;
