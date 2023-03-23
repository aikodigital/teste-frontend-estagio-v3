import React, { useState } from 'react';
import equipments from './data/equipment.json';
import equipmentState from './data/equipmentState.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';

const App = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [returnedValue, setReturnedValue] = useState({});
  const [valueArray] = useState([]);
  const [equipmentStateValue, setEquipmentState] = useState('')
  const [stateName, setStateName] = useState('')

  const getEquipmentInfo = () => {
    for (let key of equipments) {
      if(key.name === selectedValue) {
        setReturnedValue(key)
      }
    }
    const equipmentId: any = Object.values(returnedValue)[0]
    getEquipmentState(equipmentId)
  }

  const getEquipmentState = (equipmentId: string) => {
    for(let key of equipmentStateHistory) {
      if (key.equipmentId == equipmentId) {
        let StateOf = Object.values(key.states)
        let lastKeyOf: any = StateOf[StateOf.length-1]
        setEquipmentState(lastKeyOf)
      }
    }
    let equipmentIdStory: any = Object.values(equipmentState)
    for(let state of equipmentIdStory) {
      let equipmentStateStory: any = Object.values(equipmentStateValue)[1]
      if(equipmentStateStory == state.id) {
        setStateName(state.name)
      }
      // if(equipmentStateValue == state.id) {
      // }
    }
  }

  return <>
  <header>
    <h1>ForestFinder</h1>
    <p>Your forest equipment geolocation app</p>
  </header>
  <main>
    <h2>Equipments List</h2>
    <select onChange={(e) => setSelectedValue(e.target.value)}>
    {equipments.map(item => (
        <option key={item.id}>{item.name}</option>
      ))}
    </select>
    <button onClick={getEquipmentInfo}>Search</button>
    {Object.keys(returnedValue).length != 0 ?
    <div>
      <h2>Informações do equipamento:</h2>
      {stateName.length > 0 ?
        <p>Status: {stateName}</p>
        :
        <p>Status:</p>
      }
      <p>Nome: {selectedValue}</p>
      <h2>Preço por estado:</h2>
      <p>Operando:</p>
      <p>Parado:</p>
      <p>Manutenção:</p>
    </div>
    :
    <></>
    }
  </main>
  </>
}

export default App;
