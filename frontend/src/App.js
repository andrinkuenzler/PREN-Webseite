import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Container from './components/container';
import Statistics from './components/statistics';
import ImageRecoginition from './components/image_recognition';
import ResponsiveAppBar from './layout/layout';
import Skizze from './components/skizze';


function App() {
  return (
    <div className='App' >
      <ResponsiveAppBar />
      <div className='wrapper'>
        <section className='stats' id='stats'>
          <Statistics />
        </section>
        <section className='counters' id='counters'>
          <Container />
        </section>
        <section className='imageRecoginition' id='imageRecoginition'>
          <ImageRecoginition />
        </section>
        <section id='skizze'>
          <Skizze  />
        </section>
      </div>
      
    </div>
  );
}

export default App;
