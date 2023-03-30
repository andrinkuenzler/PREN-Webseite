import './statistics.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function Statistics() { 
  return (
    <div className='Wrapper'>
      <div className='skizze'>
        <h3>Geräte Statusinformationen</h3>
        <img src={placeholder} alt="placeholder" />
        <img src={placeholder} alt="placeholder" />

      </div>
    </div>
  );
}

export default Statistics;
