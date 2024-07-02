
import './App.css';
import api from './api/axoisConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/traller/Trailer';
import Review from './components/reviews/Review';
function App() {
  const[movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");
      console.log(response);
      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }
  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMovies();
  },[]);
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path = "/" element ={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path ="/Trailer/:ytTrailerId" element ={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Review getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
