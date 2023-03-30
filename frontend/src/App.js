import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Container from './components/container';
import Statistics from './components/statistics';
import ImageRecoginition from './components/image_recognition';
import ResponsiveAppBar from './layout/layout';

const socket = io.connect("http://localhost:3001");

function App() {
  const [messageReceived, setMessageReceived] = useState("33");
  
  socket.on("message", (data) => {
    console.log(data)
    setMessageReceived(data);
  });
  
  useEffect(() => {
    console.log(messageReceived)
  }, [messageReceived]);

  return (
    <div className='App'>
      {/* <h1>Team 31</h1>
      <h1> Message:</h1>
      <h1>Temperatur: {messageReceived}</h1> */}
      <ResponsiveAppBar />
      <div className='wrapper'>
        <section className='leftSide'>
          <Container />
        </section>
        <section className='rightSide'>
          <section className='statistics'>
            <Statistics />
          </section>
          <section className='imageRecoginition'>
            <ImageRecoginition />
          </section>
        </section>
      </div>
      
    </div>
  );
}

export default App;
