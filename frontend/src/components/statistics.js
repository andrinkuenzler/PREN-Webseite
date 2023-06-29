import './statistics.css';
import { CountUp } from 'use-count-up'
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://prenf23-banthama.el.eee.intern:3001/");

function Statistics() {
  const [isStarted, setIsStarted] = useState(false);
  const [sek, setSek] = useState("0");
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);


  socket.on("startStop", (data) => {
    if(data === "false"){
      setIsStarted(false)
    }else{
      setIsStarted(true)
    }
  });

  socket.on("sek", (data) => {
    var timeInSeconds = parseInt(data)
    setSec(timeInSeconds % 60)
    setMin(Math.floor(timeInSeconds / 60))
    setSek(data)
    setIsStarted(true)
  });
  
  return (
    <div className='Wrapper'>
      <div className='skizze'>
        <h3>Statusinformationen</h3>
        <div className='statsComponents'>
          <div className='time'>
            <div style={{marginBottom: 10}}>Zeit:</div>
              <div>{min} : {sec}</div>
          </div>
          <div className='energy'>
            <div style={{marginBottom: 10}}>Verbrauch:</div>
            <div>
              {isStarted ? <CountUp isCounting end={5000} duration={140}> kWh </CountUp> : <div> 0 kWh </div>}
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Statistics;
