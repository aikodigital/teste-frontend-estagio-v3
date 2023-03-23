import './App.css';
import { equipments } from './entities/equipment';
import Equipment from './components/Equipment';
import Map from './components/Map';
import SideMenu from './components/SideMenu';

function App() {
   
  return (
    <>
    <header className='container header'>
      <h2>Monitor de equipamentos</h2>
    </header>
    <main className='container main'>
      <SideMenu equipments={equipments}/>
      <Map equipments={equipments} />
      
    </main>
    </>
  )
}

export default App;
