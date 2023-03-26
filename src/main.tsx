import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ModalProvider from './context/ModalContext';
import './index.css';
import Equipments from './pages/Equipments';
import Map from './pages/Map';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Equipments />,
      },
      { path: '/maps', element: <Map /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
);
