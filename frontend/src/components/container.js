import './container.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function Container() { 
  const [countBlue, setCountBlue] = useState(0);
  const [countRed, setCountRed] = useState(0);
  const [countGreen, setCountGreen] = useState(0);
  const [countYellow, setCountYellow] = useState(0);
  return (
    <div className='Wrapper'>

      <div className='skizze'>
        <h3>skizze arbeitsplatz</h3>
        <img src={placeholder} alt="placeholder" height={500} width={300} />
      </div>
      <div className='container'>
        <div className='container_blue'>
          {countBlue}
        </div>
        <div className='container_red'>
          {countRed}
        </div>
        <div className='container_green'>
          {countGreen}
        </div>
        <div className='container_yellow'>
          {countYellow}
        </div>
      </div>
    </div>
  );
}

export default Container;
