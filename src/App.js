import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import Hero from './components/Hero';

import './App.css';

function App() {

  const [heroText, setHero] = useState('Hero');

  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Hero heroText={heroText}/>
        <Routes>
          <Route exact path="/" element={<Home setHero={setHero}/>} />
          <Route exact path="/about" element={<About setHero={setHero}/>} />
          <Route exact path="/search" element={<Search setHero={setHero}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
