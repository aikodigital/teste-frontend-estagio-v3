import "../src/css/global.css";

import { Map } from "./components/Map/Map";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { createEquipmentArray } from "./utils/equipmentList";

const equipmentArray = createEquipmentArray();

equipmentArray.forEach((equipment) => {
  console.log(equipment.getMostRecentState());
});

function App() {
  return (
    <section className="container">
      <Sidebar equipments={equipmentArray}/>
      <Map lat={-19.192595} lon={-46.061072} equipments={equipmentArray} />
    </section>
  );
}

export default App;
