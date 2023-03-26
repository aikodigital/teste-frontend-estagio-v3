import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup
} from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import equipment from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentModel from '../data/equipmentModel.json'

function getLastDate(array) {
  return array.reduce((a, b) => {
    return new Date(a.date) > new Date(b.date) ? a : b;
  });
}

function App() {
  const [equipmentPositions, setEquipmentPositions] = useState([]);

  useEffect(() => {
    getPositions();
  }, []);

  const formatState = (stateId) => {
    return equipmentState.find(item => item.id === stateId).name;
  }

  function getHistoryStates(eq) {
    const stateHistory = equipmentStateHistory.find(item => item.equipmentId === eq.id).states;
    const history = stateHistory.map(item => {
      return {
        ...item,
        name: formatState(item.equipmentStateId)
      }
    });
    return history;
  };

  function getPositions(){
    const positions = equipment.map(eq => {
      const lastPosition = getLastPosition(eq);
      const lastState = getLastStates(eq);

      return {
        ...eq,
        position: [lastPosition.lat, lastPosition.lon],
        states: lastState,
      }
    });

    setEquipmentPositions(positions);
  }

  function getLastPosition(eq) {
    const positionHistory = equipmentPositionHistory.find((item) => item.equipmentId === eq.id);
    const lastPosition = getLastDate(positionHistory.positions);

    return lastPosition;
  }

  function getLastStates(eq) {
    const stateHistory = equipmentStateHistory.find(item => item.equipmentId === eq.id).states;
    const lastState = getLastDate(stateHistory);
    const states = equipmentState.find(item => item.id === lastState.equipmentStateId);
    
    return states;
  }


  return (
    <MapContainer center={[-19.151801, -46.007759]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipmentPositions.map(eq => (
        <Marker position={eq.position} key={eq.id}>
          <Popup >
            <h3>  History {eq.name} </h3>
            {getHistoryStates(eq).map(state => (
              <div className='history-content' key={state.date}>
                <span >  State:  <b> {state.name} </b> </span> <br />
                <span >  Data:  <b> {state.date} </b> </span> <br />
              </div>
            ))}
          </Popup>
          <Tooltip>
            <h3> {eq.name} </h3>
            <span > State: <b> {eq.states.name} </b> </span>
          </Tooltip>
        </Marker>
      ))

      }
    </MapContainer>
  );
}

export default App;