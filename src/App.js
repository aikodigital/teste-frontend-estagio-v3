import './App.css';
import equipment from './data/equipment.json';
import eqModel from './data/equipmentModel.json';
import eqPositionHistory from './data/equipmentPositionHistory.json';
import eqState from './data/equipmentState.json';
import eqStateHistory from './data/equipmentStateHistory.json';
import { equipments } from './entities/equipment';
import ShowEquipments from './components/ShowEquipments';


/* console.log("equipment", equipment);
  console.log("eqModel", eqModel);//id == equipament model id de equipment
  console.log("eqPositionHistory", eqPositionHistory);
  console.log("eqState", eqState);
  console.log("eqStateHistory ",eqStateHistory); */

function App() {

  



  return (
    <main className="App">
      <ShowEquipments equipments={equipments}/>
    </main>
  );
}

export default App;
