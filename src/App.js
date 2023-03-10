import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SearchView from './components/SearchView';
import Hero from './components/Hero';

import './App.css';

const TMDBApi = new require('./TMDB.js');


const TMDBApiKey = "49c718615640bf06cb1613ac9f9b6c29";


// Init The Movie DB api
const tmdbApi = new TMDBApi(TMDBApiKey);


function App() {

  // Change the hero based on the loaded page
  const [heroText, setHero] = useState('Hero');

  // controls the search input
  const [searchText, setSearch] = useState('');


  useEffect(() => {
    if(!searchText)
      return;
    const moviesResult = searchMovies();
    console.log(moviesResult);
  }, [searchText]);

  const searchMovies = () => {
    return tmdbApi.searchMoviesByStringQuery(searchText);
  }

  return (
    <div>

      <BrowserRouter>
        <Navbar setSearch={setSearch} searchText={searchText}/>
        <Hero heroText={heroText}/>
        <Routes>
          <Route exact path="/" element={<Home setHero={setHero}/>} />
          <Route exact path="/about" element={<About setHero={setHero}/>} />
          <Route exact path="/search" element={<SearchView setHero={setHero} searchText={searchText} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
