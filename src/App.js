import React from "react"
import Header from "./componentes/Header"
import Map from "./componentes/Map"

import equipment from "./data/equipment.json"
import equipmentModel from "./data/equipmentModel.json"
import equipmentPositionHistory from "./data/equipmentPositionHistory.json"
import equipmentState from "./data/equipmentState.json"
import equipmentStateHistory from "./data/equipmentStateHistory.json"


import "./style/App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Map
        equipment={equipment}
        equipmentModel={equipmentModel}
        equipmentPositionHistory={equipmentPositionHistory}
        equipmentState={equipmentState}
        equipmentStateHistory={equipmentStateHistory}
      />
    </div>
  );
}

export default App;
