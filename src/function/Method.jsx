import { baseUrl } from "./BaseUrl";
import { apiKey } from "./BaseUrl";
import axios from "axios";
export const getPopularFilm = async (page) => {
    try {
        const response = await axios.get(`${baseUrl}3/movie/popular?api_key=${apiKey}&page=${page}`);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const getGenre = async () => {
    try {
        const response = await axios.get(`${baseUrl}3/genre/list?api_key=${apiKey}`);
        const data = response.data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const searchMovie = async (search, page) => {
    try {
        const response = await axios.get(`${baseUrl}3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const getMovie = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}3/movie/${id}?api_key=${apiKey}`);
        const data = response.data;
        return data;
    } catch(err) {
        console.log(err);
    }
} 

export const getMovieByGenre = async (genreId, page) => {
    try {
        const response = await axios.get(`${baseUrl}3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`);
        const data = response.data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}