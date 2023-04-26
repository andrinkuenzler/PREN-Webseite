import './image_recognition.css';
import { useEffect, useState } from "react";
import hit from "../images/hit/hit.jpg"
import noHit from "../images/noHit/noHit.jpg"


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
            <img src={noHit} alt="placeholder" width={600} style={{maxWidth: "100%", height:"auto"}} />
          </div>
          <div className='imagesWithText'>
            <div style={{marginBottom: 20, marginTop: 20}}>
              Letzter Treffer
            </div>
            <img src={hit} alt="placeholder" width={600} style={{maxWidth: "100%", height:"auto"}}/>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ImageRecoginition;
