import logo from './logo.svg';
import './App.css';
import MapsPage from './componentes/MapsPage.tsx';
import Header from './componentes/Header';
import React from 'react'

import position from './equips/equipmentPositionHistory.json';



function App() {
   
  return (    
    <div>
      <Header/>
       <MapsPage/>
    </div>

    
  )
}

export default App;

