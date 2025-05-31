import React from 'react';
import Header from './components/Header/Header';
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel';
import Timeline from './components/Timeline/Timeline';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Timeline />
      <PhotoCarousel />     
      <Footer />
    </div>
  );
}

export default App;