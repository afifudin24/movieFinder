/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Alert } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ModalAddWatchlist = ({ buka, setBuka, movie }) => {
  const [watchList, setWatchList] = useState([]);
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [errorLog, setErrorLog] = useState('');
  const [successLog, setSuccessLog] = useState('');

  // Ambil watchList dari localStorage ketika aplikasi pertama kali dimuat
  useEffect(() => {
    if (buka) {
      // Ambil watchList dari localStorage
      const storedWatchList = localStorage.getItem('watchList');
      console.log(storedWatchList);
      if (storedWatchList) {
        console.log('Local storage found:', storedWatchList); // Log ini membantu kita memeriksa data yang ada di localStorage
        setWatchList(JSON.parse(storedWatchList));
      } else {
        console.log('No watchList found in localStorage'); // Ini akan menampilkan pesan jika tidak ada data di localStorage
      }

      // Ambil movieWatchlist dari localStorage
      const storedMovieWatchlist = JSON.parse(localStorage.getItem('movieWatchlist'));
      if (storedMovieWatchlist) {
        console.log("Ada ", storedMovieWatchlist);
        setMovieWatchlist(storedMovieWatchlist);
      } else {
        console.log("Tidak ada data");
      }
    }
  }, [buka]); // Tambahkan 'buka' ke array dependensi

  // Fungsi untuk menutup modal
  const handleClose = () => setBuka(false);
  const [wSelected, setWSelected] = useState('');
  const [isWatchlist, setIsWatchlist] = useState(true);

  const handleChange = (event) => {
    setWSelected(event.target.value);
  };

  const addMovieToWatchlist = (watchlistId, movieId) => {
    const data = {
      watchlist_id: watchlistId,
      movie_id: movieId
    };
    console.log(data);
    if (data.watchlist_id == '') {
      setIsWatchlist(false)
    } else {
      setIsWatchlist(true)
      console.log("OK");
      const exists = movieWatchlist.some(movie => movie.movie_id == movieId && movie.watchlist_id === watchlistId);
      if (exists) {
        console.log("Data sudah ada");
        setAlertError(true);
        setErrorLog("Data Exist");
        setTimeout(() => {
          setAlertError(false);
        }, 3000);

      } else {
        console.log("Data Baru");
        setAlertSuccess(true);
        setSuccessLog("Success Added To Watchlist");
        setMovieWatchlist(prev => {
          const updateMovieWatchlist = [...prev, data];
          console.log("ini data", updateMovieWatchlist)
          localStorage.setItem('movieWatchlist', JSON.stringify(updateMovieWatchlist));
          return updateMovieWatchlist;
        });
        setTimeout(() => {
          setAlertSuccess(false);
          setSuccessLog('');
          handleClose();
        }, 3000);
      }
    }



  }



  // Styling untuk modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '50%' },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    fontSize: '1rem',
  };
  return (
    <Modal

      open={buka}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
          alertError ? <Alert className="my-3" variant="filled" severity="error">
            {errorLog}
          </Alert> : ''
        }
        {
          alertSuccess ? <Alert className='my-3' variant="filled" severity="success">
            {successLog}
          </Alert> : ''
        }
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add  {movie.title} To Watchlist
        </Typography>
        <FormControl sx={{ my: 2, minWidth: 220 }} size="small">
          <InputLabel id="demo-select-small-label">WatchList</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={wSelected}
            label="WatchList"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              watchList.length > 0 ?
                watchList.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.watchlist}</MenuItem>
                ))
                :
                ''


            }

          </Select>
        </FormControl>
        <div>
          {
            isWatchlist ? '' : (
              <p>Choose Watchlist</p>
            )
          }

          <Button onClick={() => addMovieToWatchlist(wSelected, movie.id)} variant='contained' color='success' sx={{ mt: 2, mr: 2 }}>
            Add
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default ModalAddWatchlist;