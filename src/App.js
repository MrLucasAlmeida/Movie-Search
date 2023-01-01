import './App.css';
import SearchIcon from './search.svg'
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';




const API_URL = 'http://www.omdbapi.com?apikey=757fba3a';



const App = () => {

  
  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const movieSearch = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    // sort movies alphabetically
    setMovies(data.Search);

  }

  useEffect(() => {
    movieSearch(searchTerm);
  }, []);

  useEffect(() => {
    movieSearch(searchTerm);
  }, [searchTerm])






  return (
    <div className="app">
      <h1>MovieSearch</h1>

      <div className="search">
        <input
          placeholder='Search All Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onSubmit={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search icon'
          onClick={() => movieSearch(searchTerm)}
        />
      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
            
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}

    </div>
  );
}

export default App;
