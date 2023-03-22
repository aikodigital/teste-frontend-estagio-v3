import './App.css';
import equipment from './data/equipment.json';
import eqModel from './data/equipmentModel.json';
import eqPositionHistory from './data/equipmentPositionHistory.json';
import eqState from './data/equipmentState.json';
import eqStateHistory from './data/equipmentStateHistory.json';

function App() {
  console.log("equipment", equipment);
  console.log("eqModel", eqModel);
  console.log("eqPositionHistory", eqPositionHistory);
  console.log("eqState", eqState);
  console.log("eqStateHistory ",eqStateHistory)

  return (
    <div className="App">
      Olá mundo
    </div>
  );
}

export default App;
