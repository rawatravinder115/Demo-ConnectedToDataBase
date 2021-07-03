import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

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
  const [IsLoading, setIsLoading]=useState(false);

  // function fetchMoviesHandler(){
  //   fetch('http://swapi.dev/api/films/')
  //   .then((response) =>{
  //     return response.json();
  //   })
  //   .then((data) =>{
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("http://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((moviesData) => {
      return {
        id: moviesData.episode_id,
        title: moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
    // });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       { !IsLoading && movies.length > 0 && <MoviesList movies={movies} />}
       {!IsLoading && movies.length === 0 && <p>Found no movies.</p>}
       {IsLoading && <p>Loading... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
