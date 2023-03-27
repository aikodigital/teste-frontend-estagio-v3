import React, { useState, useRef }from 'react';
import Map from './Map';
import 'leaflet/dist/leaflet.css';
import './App.css';
import logo from './img/aiko.png';
import Map2 from './Map2';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './Map.css';



function App() {
    const mapaCompletoRef = useRef(null);
    
    const MapButton = (equip, lista) => {
      const x = lista.findIndex(obj => obj.key === equip);
      createRoot(document.querySelector('.mapa-completo')).render(<Map2 Retorna={Retorna} equipmentId={equip} marker={lista[x]}/>);
    };
    const Retorna = () =>{
      createRoot(document.querySelector('.mapa-completo')).render(<div><Map MapButton={MapButton}/></div>);
    }
    return (
      
    <div className="App">
      <div className='logo'>
        <img src={logo} alt='logo' className='logoimg'/>
      </div>
      <div className='mapa-completo'  ref={mapaCompletoRef}>
        <Map MapButton={MapButton}/>
      </div>
      <div className='triangulo'></div>
    </div>
    
  );
}

export default App;
