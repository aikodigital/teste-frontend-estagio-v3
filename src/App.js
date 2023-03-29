import { equipments, zoomDefault } from './entities/equipment';
import Map from './components/Map';
import SideMenu from './components/SideMenu';
import './App.css';
import { useState } from 'react';

function App() {
  const [zoomIn, setZoomIn] = useState(zoomDefault);
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
          report={report} 
          setReport={setReport}/>
        <Map 
          equipments={equipments} 
          zoom={zoomIn} 
          setZoomIn={setZoomIn}
          report={report} 
          setReport={setReport} />
      </main>
    </>
  )
}

export default App;
