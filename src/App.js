import React, { useState,useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from './components/AddMovie';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  // function fetchMoviesHandler(){
  //   fetch('http://swapi.dev/api/films/')
  //   .then((response) =>{
  //     return response.json();
  //   })
  //   .then((data) =>{

  // async function fetchMoviesHandler() {
    const fetchMoviesHandler= useCallback( async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const data = await response.json();

      const loadedMovies= [];

      for(const key in data){
        loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
        });
      } 

      // const transformedMovies = data.results.map((moviesData) => {
        // for getting data from database (firebase).

      //   const transformedMovies = data.map((moviesData) => {
      //   return {
      //     id: moviesData.episode_id,
      //     title: moviesData.title,
      //     openingText: moviesData.opening_crawl,
      //     releaseDate: moviesData.release_date,
      //   };
      // });
      // setMovies(transformedMovies);

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    // });
  },[]);

  useEffect(()=> {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('http://react-http-----.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Typr': 'application/json'
      }  
  });

  const data = await response.json();
  console.log(data);
  }

  let content = <p>Found no Movies.</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies}/>;
  }

  if(error){
    content=<p>{error}</p>;
  }

  if(IsLoading){
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!IsLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!IsLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!IsLoading && error && <p>{error}</p>}
        {IsLoading && <p>Loading... </p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
