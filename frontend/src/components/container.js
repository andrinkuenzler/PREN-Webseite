import './container.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function Container() { 
  const [countBlue, setCountBlue] = useState(5);
  const [countRed, setCountRed] = useState(3);
  const [countGreen, setCountGreen] = useState(1);
  const [countYellow, setCountYellow] = useState(3);
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
              Kronkorken
            </div>
            <div className='containers' id='red'>
              {countRed}
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
