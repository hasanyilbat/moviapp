import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
//! https://api.themoviedb.org/3/movie/550?api_key=681860e951e4d7ea32cea7ee3894af3d

const Main = () => {
  const API_KEY = "681860e951e4d7ea32cea7ee3894af3d";
  const urlData = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  //   const forMovieDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  const [movieData, setMovieData] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [searchMovie, setSearchMovie] = useState("");
  const urlForSearch = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`;

  const getMovieData = async () => {
    try {
      const response = await axios.get(urlData);
      setMovieData(response.data.results);
      // console.log(movieData);
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchMovie = async () => {
    try {
      const response = await axios.get(urlForSearch);
      setSearchMovie(response.data.results);
      console.log(searchMovie);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchMovie();
  };

  useEffect(() => {
    getMovieData();
  }, []);

  // getMovieData();
  return (
    <div className="main-container ">
      <div className="mb-3 w-50 m-auto text-center d-flex justify-content-center mt-4">
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search a movie..."
            aria-describedby="basic-addon2"
            style={{ width: "25rem" }}
            onChange={(e) => setMovieName(e.target.value)}
            value={movieName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-success btn-primary text-light mt-2"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex flex-wrap main-body gap-3 justify-content-center mt-4 mb-4 ">
        {!searchMovie
          ? movieData.map((movie, index) => (
              <MovieCard movieData={movie} key={index} />
            ))
          : searchMovie.map((movie) => <MovieCard movieData={movie} />)}
      </div>
    </div>
  );
};

export default Main;
