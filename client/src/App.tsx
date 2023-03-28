//@ts-nocheck
import "../src/css/global.css";
import { useState, useEffect, createContext } from "react";
import { Map } from "./components/Map/Map";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { createEquipmentArray } from "./utils/equipmentList";

export const EquipmentContext = createContext();
const equipmentArray = createEquipmentArray();

function App() {
  const [equipmentIndex, setEquipmentIndex] = useState(0);

  return (
    <section className="container">
      <EquipmentContext.Provider value={[equipmentIndex, setEquipmentIndex]}>
        <Sidebar equipments={equipmentArray} />
        <Map lat={-19.192595} lon={-46.061072} equipments={equipmentArray} />
      </EquipmentContext.Provider>
    </section>
  );
}

export default App;