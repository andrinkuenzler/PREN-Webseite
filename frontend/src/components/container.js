import './container.css';
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Container() { 
  const [countBlue, setCountBlue] = useState("0");
  const [countRed, setCountRed] = useState("0");
  const [countGreen, setCountGreen] = useState("0");
  const [countYellow, setCountYellow] = useState("0");
  
  socket.on("pet", (data) => {
    setCountBlue(data)
  });
  
  socket.on("korken", (data) => {
    setCountRed(data)
  });

  socket.on("stuemmel", (data) => {
    setCountGreen(data)
  });

  socket.on("wert", (data) => {
    setCountYellow(data)
  });


  return (
    <div>
       <h3>Counters</h3>
        <div className='parentContainer'>

          <div className='titleWithContainer'>
            <div className='titleContainer'>
              Pet-Deckel
            </div>
            <div className='containers' id='blue'>
              {countBlue}
            </div>
          </div>
          <div className='titleWithContainer'>
            <div className='titleContainer'>
              Zigarettenstümmel
            </div>
            <div className='containers' id='green'>
              {countGreen}
            </div>
          </div>
          <div className='titleWithContainer'>
            <div className='titleContainer'>
              Kronkorken
            </div>
            <div className='containers' id='red'>
              {countRed}
            </div>
          </div>
          
          <div className='titleWithContainer'>
            <div className='titleContainer'>
              Wertgegenstände
            </div>
            <div className='containers' id='yellow'>
              {countYellow}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Container;
