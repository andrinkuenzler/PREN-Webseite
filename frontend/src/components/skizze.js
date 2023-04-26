import './skizze.css';
import skizze from "../images/skizze.png"


function Skizze() { 
  return (
    <div className='Wrapper'>
      <div className='skizze'>
        <h3>Skizze</h3>
        <img src={skizze} alt="placeholder"  style={{maxWidth: "100%", height:"auto"}} />
      </div>
      
    </div>
  );
}

export default Skizze;
