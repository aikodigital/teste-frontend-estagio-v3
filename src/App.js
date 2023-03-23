import './App.css';
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
