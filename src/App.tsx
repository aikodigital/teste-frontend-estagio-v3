import React, { Fragment } from 'react';
import './App.css';
import ModalEquipmentsDetails from './components/ModalEquipmentsDetails/ModalEquipmentsDetails.component';
import MapPosition from './Features/MapPosition/MapPosition.component';

function App() {
  return (
    <>
      <ModalEquipmentsDetails />
      <div className='App'>
        <MapPosition />
      </div>
    </>
  );
}

export default App;
