import './image_recognition.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function ImageRecoginition() { 
  return (
    <div className='Wrapper'>
      <div className='skizze'>
        <h3>Bilderkennung</h3>
        <div>
          <img src={placeholder} alt="placeholder"  />
          <img src={placeholder} alt="placeholder" />
        </div>
      </div>
      
    </div>
  );
}

export default ImageRecoginition;
