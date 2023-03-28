import React, { useState, useRef }from 'react';
import Map from './Map';
import 'leaflet/dist/leaflet.css';
import './App.css';
import logo from './img/aiko.png';
import './Map.css';
import Select from './Select';


function App() {
    const mapaCompletoRef = useRef(null);
    
    return (
      
    <div className="App">
      <div className='cabecalho'>
        <img src={logo} alt='logo' className='logoimg'/>
        
        <Select />
      </div> 
      <div className='mapa-completo'  ref={mapaCompletoRef}>
        <Map filter={null} />
      </div>
      <div className='triangulo'></div>
    </div>
    
  );
}

export default App;
