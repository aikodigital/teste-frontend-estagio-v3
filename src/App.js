import './App.css';
import equipment from './data/equipment.json';
import eqModel from './data/equipmentModel.json';
import eqPositionHistory from './data/equipmentPositionHistory.json';
import eqState from './data/equipmentState.json';
import eqStateHistory from './data/equipmentStateHistory.json';

function App() {
  console.log("equipment", equipment);
  console.log("eqModel", eqModel);//id == equipament model id de equipment
  console.log("eqPositionHistory", eqPositionHistory);
  console.log("eqState", eqState);
  console.log("eqStateHistory ",eqStateHistory);

  class Equipment{
    constructor(name, id, modelId, modelName, historyPosition, eqState, stateHistory){
      this.name = name;
      this.id = id;
      this.modelId = modelId;
      this.modelName = modelName;
      this.historyPosition = historyPosition;
      this.eqState = eqState;
      this.stateHistory = stateHistory;
    }
  }

  return (
    <div className="App">
      Olá mundo
    </div>
  );
}

export default App;
