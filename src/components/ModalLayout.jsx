import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const ModalLayout = ({ watchList, setWatchList }) => {
    // State untuk mengontrol pembukaan dan penutupan modal
    const [open, setOpen] = useState(false);
    const [newWatchlist, setNewWatchList] = useState('');

    // Set localStorage saat watchList berubah

    // Fungsi untuk mengubah nilai input
    const handleChangeWatchlist = (event) => {
        setNewWatchList(event.target.value);
    };

    // Fungsi untuk menambahkan item ke watchlist dan menyimpannya ke localStorage
   const addWatchList = () => {
    if (newWatchlist.trim()) {
      const newEntry = {
        id: Date.now(),  // Membuat ID otomatis berdasarkan waktu
        watchlist: newWatchlist,  // Isi watchlist dengan nilai dari input
      };

      setWatchList(prevList => {
        const updatedList = [...prevList, newEntry];
        // Simpan ke localStorage sebagai objek
        localStorage.setItem('watchList', JSON.stringify(updatedList));
        return updatedList;
      });

      setNewWatchList('');  // Reset input setelah ditambahkan
      handleClose();
    }
  };

    // Fungsi untuk membuka modal
    const handleOpen = () => setOpen(true);

    // Fungsi untuk menutup modal
    const handleClose = () => setOpen(false);

    // Styling untuk modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        fontSize: '1rem',
    };

    return (
        <div>
            {/* Tombol untuk membuka modal */}
            <button onClick={handleOpen} className="w-full bg-secondary hover:bg-secondaryHover duration-100 transition-all p-2 rounded-md font-archivo font-semibold">
                Create Watchlist
            </button>

            {/* Modal component */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Watchlist
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            id="outlined-basic"
                            value={newWatchlist}
                            label="Watchlist Name"
                            variant="outlined"
                            onChange={handleChangeWatchlist}
                        />
                    </Typography>
                    <Button variant='contained' color='success' onClick={addWatchList} sx={{ mt: 2, mr: 2 }}>
                        Add
                    </Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalLayout;
