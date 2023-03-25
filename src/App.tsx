import React, { useState, useEffect } from 'react';
import equipments from './data/equipment.json';
import equipmentState from './data/equipmentState.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentModel from './data/equipmentModel.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import MapPage from './pages/mapPage';

const App = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [returnedValue, setReturnedValue] = useState({});
  const [valueArray] = useState([]);
  const [equipmentStateValue, setEquipmentState] = useState('')
  const [stateName, setStateName] = useState('')
  const [equipmentModelValue, setEquipmentModelValue] = useState([])
  const [equipmentHistoryArray, setEquipmentHistoryArray] = useState([])
  const [equipmentPositionState, setEquipmentPositionHistory] = useState([])

  const getEquipmentInfo = () => {
    for (let key of equipments) {
      if(key.name === selectedValue) {
        setReturnedValue(key)
      }
    }
    const equipmentId: any = Object.values(returnedValue)[0]
    const equipmentModelId: any = Object.values(returnedValue)[1]
    getEquipmentState(equipmentId)
    getEquipmentModelPrices(equipmentModelId)
    getEquipmentHistory(equipmentId)
    getEquipmentPositionHistory(equipmentId)
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
    }
  }

  const getEquipmentModelPrices = (equipmentModelId: string) => {
    let myValuesArr: any = []
    for(let i = 0; i < equipmentModel.length; i++) {
      let arrayObject = equipmentModel[i].hourlyEarnings
      if(equipmentModel[i].id == equipmentModelId) {
        for(let j = 0; j < arrayObject.length; j++) {
         let priceValues = Object.values(arrayObject[j])[1]
         myValuesArr.push(priceValues)
        }
      }
    }
    setEquipmentModelValue(myValuesArr)
  }

  const getEquipmentHistory = (equipmentId: any) => {
    // let lastValuesArray: Array<object> | string = []
    let lastValuesArray: any = []
    let returnedValuesArray: any = []
    let dateValuesArray: any = []
    for(let key of equipmentStateHistory) {
      if(key.equipmentId == equipmentId) {
        let lastStates = Object.values(key)[1]
        let lastStatesArray = lastStates.slice(lastStates.length - 4);
        lastValuesArray = lastStatesArray
      }
    }
    

    for(let i = 0; i < lastValuesArray.length; i++) {
      for(let j = 0; j < equipmentState.length; j++) {
        if(lastValuesArray[i].equipmentStateId == equipmentState[j].id){
          const formatedDate = new Date(lastValuesArray[i].date);
          const dateBr = formatedDate.toLocaleDateString('pt-BR') + ' ' + formatedDate.toLocaleTimeString('pt-BR');
          let newObject = {
            date: dateBr,
            name: equipmentState[j].name
          }
          returnedValuesArray.push(newObject)
        }
      }
    }
    setEquipmentHistoryArray(returnedValuesArray)
  }

  const getEquipmentPositionHistory = (equipmentId: any) => {
    let returnedValuesArray: any = []
    for(let i = 0; i < equipmentPositionHistory.length; i++) {
      if(equipmentPositionHistory[i].equipmentId == equipmentId) {
        let lastPositions = Object.values(equipmentPositionHistory[i])[1]
        let lastPositionsArray: any = lastPositions.slice(lastPositions.length - 2);
        for(let j = 0; j < lastPositionsArray.length; j++) {
          const formatedDate = new Date(lastPositionsArray[j].date);
          const dateBr = formatedDate.toLocaleDateString('pt-BR') + ' ' + formatedDate.toLocaleTimeString('pt-BR');
          let newObject: any = {
            date: dateBr,
            lat: lastPositionsArray[j].lat,
            lon: lastPositionsArray[j].lon,
          }
          returnedValuesArray.push(newObject)
          console.log(equipmentPositionState)
        }
      }
    }
    setEquipmentPositionHistory(returnedValuesArray)
  }

  return <>
  <header>
    <h1>ForestFinder</h1>
    <p>Your forest equipment geolocation app</p>
  </header>
  <main>
    <h2>Equipments List</h2>
    <select onChange={(e) => 
      setSelectedValue(e.target.value)
      }>
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
      <p>Operando:{equipmentModelValue[0]}</p>
      <p>Parado:{equipmentModelValue[1]}</p>
      <p>Manutenção:{equipmentModelValue[2]}</p>

      <h2>Histórico de estado do equipamento:</h2>
      <ul>
        {equipmentHistoryArray.map((item,index) => (
          <li key={index}>
            Data: {item['date']} {'\n'}
            Estado: {item['name']}
          </li>
        ))}
      </ul>
      <h2>Posição mais recente do equipamento:</h2>
      <ul>
        {equipmentPositionState.map((item,index) => (
          <li key={index}>
            Data: {item['date']} {'\n'}
            Local: {item['lat']} {'\n'} {item['lon']}
            {'\n'}
            <button>Ver no mapa</button>
          </li>
        ))}
      </ul>

    </div>
    :
    <></>
    }
    <MapPage/>
  </main>
  </>
}

export default App;
