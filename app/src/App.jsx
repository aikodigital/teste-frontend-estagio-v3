import './App.css'
import Header from './components/header/Header'
import Map from './components/map/Map'

import { useState } from 'react'
import Home from './pages/Home'


//ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpecificMap from './components/map/SpecificMap.jsx'


function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/:id" element={<SpecificMap />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
