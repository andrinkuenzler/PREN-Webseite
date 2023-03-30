import './image_recognition.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function ImageRecoginition() { 
  return (
    <div className='Wrapper'>
      <div className='image_reg'>
        <h3>Bilderkennung</h3>
        <div className='images'>
          <div className='imagesWithText'>
            <div style={{marginBottom: 20}}>
              Aktuelle Aufnahme
            </div>
            {/* <img src={placeholder} alt="placeholder" width={600}  /> */}
          </div>
          <div className='imagesWithText'>
            <div style={{marginBottom: 20}}>
              Letzter Treffer
            </div>
            {/* <img src={placeholder} alt="placeholder" width={600}/> */}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ImageRecoginition;
