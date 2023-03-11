import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MoviesView from './components/MoviesView';
import Hero from './components/Hero';

import './App.css';

const TMDBApi = new require('./TMDB.js');


const TMDBApiKey = "49c718615640bf06cb1613ac9f9b6c29";


// Init The Movie DB api
const tmdbApi = new TMDBApi(TMDBApiKey);


function App() {

  // Change the hero text based on the loaded page
  const [heroText, setHero] = useState('Hero');

  // controls the search input
  const [searchText, setSearch] = useState('');

  // Query Results - Movies list & page info
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0); // used to calculate movies cards keys
  const [isLastPage, setIsLastPage] = useState(true); // used for load-more button
  const [resTime, setResTime] = useState(Date.now()); // make sure to load only the last result


  useEffect(() => {

    const getPopularMovies = () => {
      return new Promise((res, rej) => {
        res(tmdbApi.getPopularMovies(searchText));
      });
    }

    const searchMovies = () => {
      return new Promise((res, rej) => {
        res(tmdbApi.searchMoviesByStringQuery(searchText));
      });
    }

    const loadSearchResults = async (searchRes, searchTime) => {
      if(searchTime < resTime)
        return;
      
      await searchRes

      setResTime(searchTime);
      setMovies(searchRes.movies);
      setPage(searchRes.page);
      setIsLastPage(searchRes.isLastPage);
    }

    
    const searchTime = Date.now();

    /**
     * If no search was performed(searchText is empty), get the most popular movies
     * otherwise query the searched movie/s
     */
    if(!searchText)
    {
      getPopularMovies()
        .then((moviesResult) => {
          loadSearchResults(moviesResult, searchTime);
        });
    }
    else
    {
      searchMovies()
        .then((moviesResult) => {
          loadSearchResults(moviesResult, searchTime);
        });
    }
  }, [searchText]);

  return (
    <div>

      <BrowserRouter>
        <Navbar setSearch={setSearch} searchText={searchText}/>
        <Hero heroText={heroText}/>
        <Routes>
          <Route exact path="/" element={[<Home setHero={setHero}/>, <MoviesView
            setHero={setHero} searchText={searchText} movies={movies}
            page={page} isLastPage={isLastPage} isSearch={false}/>]} />
          <Route exact path="/about" element={<About setHero={setHero}/>} />
          <Route exact path="/search" element={<MoviesView
            setHero={setHero} searchText={searchText} movies={movies}
            page={page} isLastPage={isLastPage} isSearch={true}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
