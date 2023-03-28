import { equipments } from './entities/equipment';
import Map from './components/Map';
import SideMenu from './components/SideMenu';
import './App.css';
import { useState } from 'react';

function App() {

  const [position, setPosition] = useState([-19.1000, -46.1000]);
  const [zoomIn, setZoomIn] = useState(11.5);
  const [report, setReport] = useState(null);

  return (
    <>
      <header className='container header'>
        <h2>Monitor de equipamentos</h2>
      </header>
      <main className='container main'>
        <SideMenu 
          equipments={equipments} 
          setZoomIn={setZoomIn} 
          setPosition={setPosition} 
          report={report} 
          setReport={setReport}/>
        <Map equipments={equipments} zoom={zoomIn} position={position} setReport={setReport} />
      </main>
    </>
  )
}

export default App;
