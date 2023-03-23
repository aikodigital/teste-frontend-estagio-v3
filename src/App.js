import './App.css';
import equipment from './data/equipment.json';
import eqModel from './data/equipmentModel.json';
import eqPositionHistory from './data/equipmentPositionHistory.json';
import eqState from './data/equipmentState.json';
import eqStateHistory from './data/equipmentStateHistory.json';
import { equipments } from './entities/equipment';
import Equipment from './components/Equipment';

function App() {

  const listEquipments = equipments.map(equipment => <Equipment key={equipment.id} equipment={equipment} />)

  return (
    <main>
      <ul>
        {listEquipments}
      </ul>
    </main>
  )
}

export default App;
