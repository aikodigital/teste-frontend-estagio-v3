import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner/Index';
import Footer from './components/Footer/Index';
import NavBar from './components/NavBar/Index';
import EquipmentHistory from './pages/EquipmentHistory/Index';
import Home from './pages/Home/Index';
import './styles/Global.scss';

function App() {

  return (
    <div >
      <Banner />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/EquipmentHistory' element={<EquipmentHistory />}> </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
