import React, { useState, useEffect } from 'react';
import equipments from './data/equipment.json';
import equipmentState from './data/equipmentState.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentModel from './data/equipmentModel.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import MapPage from './pages/MapPage';

const App = () => {

  const [returnedValue, setReturnedValue] = useState({});
  const [valueArray] = useState([]);
  const [equipmentStateValue, setEquipmentState] = useState('')
  const [stateName, setStateName] = useState('')
  const [equipmentModelValue, setEquipmentModelValue] = useState([])
  const [equipmentHistoryArray, setEquipmentHistoryArray] = useState([])
  const [equipmentPositionState, setEquipmentPositionHistory] = useState([])
  const [selectedValue, setSelectedValue] = useState(equipments[0].name);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLon, setSelectedLon] = useState(null);

  useEffect(() => {
    const equipmentId: any = Object.values(returnedValue)[0]
    const equipmentModelId: any = Object.values(returnedValue)[1]
    getEquipmentState(equipmentId)
    getEquipmentModelPrices(equipmentModelId)
    getEquipmentHistory(equipmentId)
    getEquipmentPositionHistory(equipmentId)
  }, [stateName, equipmentModelValue, equipmentHistoryArray, equipmentPositionState]);

  const getEquipmentInfo = () => {
    for (let key of equipments) {
      if(key.name === selectedValue) {
        setReturnedValue(key)
      }
    }
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
        }
      }
    }
    setEquipmentPositionHistory(returnedValuesArray)
  }

  const getGoogleMapPosition = (lat: any, lon: any) => {
    setSelectedLat(lat);
    setSelectedLon(lon);
  }

  return <div className='px-[190px]  bg-[#161616] text-white font-extrabold'>
  <header className=''>
    <h1 className='text-4xl text-white pt-[60px]'><span className='text-[#006404]'>Forest</span>Finder</h1>
    <p>Your forest equipment geolocation app</p>
  </header>
  <main className='flex mt-[150px] justify-between'>
    <div>
    <h2>Equipments:</h2>
    <select className="text-black h-[30px] w-[190px] my-5" onChange={(e) => 
      setSelectedValue(e.target.value)
      }>
    {equipments.map(item => (
        <option
        key={item.id} 
        value={item.name} 
        className="text-black"
        selected={item.name === selectedValue}>{item.name}</option>
      ))}
    </select>
    <button onClick={getEquipmentInfo} className="block h-[50px] w-[190px] bg-[#006404] rounded text-white">Search</button>
    {Object.keys(returnedValue).length != 0 ?
    <div>
      <h2 className='text-2xl'>Informações do equipamento:</h2>
      {stateName.length > 0 ?
        <p>Status: <span className='text-[#CAB8FD]'>{stateName}</span></p>
        :
        <p>Status:</p>
      }
      <p>Nome: <span className='text-[#2E80CC]'>{selectedValue}</span></p>
      <h2 className='text-2xl'>Preço por estado:</h2>
      <p><span className='text-[#2ECC71]'>Operando:</span> {equipmentModelValue[0]} $</p>
      <p><span className='text-[#F1C40F]'>Parado:</span> {equipmentModelValue[1]} $</p>
      <p><span className='text-[#E74C3C]'>Manutenção:</span> {equipmentModelValue[2]} $</p>

      <h2 className='text-2xl'>Histórico de estado do equipamento:</h2>
      <ul>
        {equipmentHistoryArray.map((item,index) => (
          <li key={index}>
            <span className='text-[#2E80CC]'>Data:</span> {item['date']} {'\n'}
            <span className='text-[#2E80CC]'>Estado:</span> {item['name']}
          </li>
        ))}
      </ul>
      <h2 className='text-2xl'>Posição mais recente do equipamento:</h2>
      <ul>
        {equipmentPositionState.map((item,index) => (
          <li key={index}>
            <span className='text-[#2E80CC]'>Data:</span> {item['date']} {'\n'}
            <span className='text-[#2E80CC]'>Local:</span> {item['lat']} {'\n'} {item['lon']}
            {'\n'}
            <button className="text-[#5AB0FF]"onClick={() => getGoogleMapPosition(item['lat'], item['lon'])}>Ver no mapa</button>
          </li>
        ))}
      </ul>

    </div>
    :
    <></>
    }
    </div>
    <div className='w-2/4'>
      <MapPage lat={selectedLat} lon={selectedLon}/>
    </div>
  </main>
  </div>
}

export default App;
