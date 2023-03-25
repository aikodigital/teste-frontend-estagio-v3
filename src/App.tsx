import Header from './components/Header';

import { Outlet } from 'react-router-dom';
import ModalEquipment from './components/ModalEquipment';
import ModalProvider, { ModalConsumer } from './context/ModalContext';

function App() {
  return (
    <div>
      <Header />
      <ModalProvider>
        <Outlet />
        <ModalConsumer>
          {({ isModalOpen }) => isModalOpen && <ModalEquipment />}
        </ModalConsumer>
      </ModalProvider>
    </div>
  );
}

export default App;
