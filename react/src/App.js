import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';

function App () {

  return (
    <BrowserRouter>
      <header>
        <h2>Double Pleasure</h2>
        <Navbar />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Main />} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
