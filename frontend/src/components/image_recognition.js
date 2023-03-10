import './image_recognition.css';
import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.jpeg"

function ImageRecoginition() { 
  return (
    <div className='Wrapper'>
      <div className='skizze'>
        <h3>Bilderkennung</h3>
        <img src={placeholder} alt="placeholder" />
      </div>
      <div className='container'>
        <div className='container_blue'></div>
        <div className='container_red'></div>
        <div className='container_green'></div>
        <div className='container_yellow'></div>
      </div>
    </div>
  );
}

export default ImageRecoginition;
