import { Outlet } from 'react-router-dom';
import ModalEquipment from './components/ModalEquipment';
import { ModalContext } from './context/ModalContext';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

function App() {
  const { isModalOpen } = useContext(ModalContext);

  return (
    <div>
      <Outlet />
      <AnimatePresence>{isModalOpen && <ModalEquipment />}</AnimatePresence>
    </div>
  );
}

export default App;
