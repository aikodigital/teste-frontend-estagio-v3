import React, { useState, useEffect } from 'react';
import equipments from '../../data/equipment.json';
import equipmentState from '../../data/equipmentState.json';
import equipmentStateHistory from '../../data/equipmentStateHistory.json';
import equipmentModel from '../../data/equipmentModel.json';
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import MapPage from '../MapPage/MapPage';
import LandingProps from '../../interfaces/interfaces';
import { Position, NewObject } from '../../interfaces/interfaces';
import "animate.css";

export default function Dashboard({ setDashLoaded }: LandingProps) {

    const [returnedValue, setReturnedValue] = useState<any>([]);
    const [equipmentStateValue, setEquipmentState] = useState('')
    const [equipmentModelValue, setEquipmentModelValue] = useState<any>([]);
    const [equipmentHistoryArray, setEquipmentHistoryArray] = useState([])
    const [equipmentPositionState, setEquipmentPositionHistory] = useState([])
    const [selectedValue, setSelectedValue] = useState(equipments[0].name);
    const [selectedLat, setSelectedLat] = useState<number | null>(null);
    const [selectedLon, setSelectedLon] = useState<number | null>(null);
    const [searchClicked, setSearchClicked] = useState(false)
    const [lastNameState, setLastName] = useState('')
  
    useEffect(() => {
  
      const foundEquipment = equipments.find(equipment => equipment.name === selectedValue);
      if (foundEquipment) {
        setReturnedValue(foundEquipment);
      }      
      
      const filteredHistory = equipmentStateHistory.filter(
        (equipmentState) => equipmentState.equipmentId === Object.values(returnedValue)[0]
      );
  
      let lastState: {
          date: string;
          equipmentStateId: string;
          } = {
              date: '',
              equipmentStateId: ''
          };
  
      if (filteredHistory.length > 0 && filteredHistory[0].states) {
        const states = filteredHistory[0].states;
        if (states.length > 0) {
          lastState = states[states.length - 1];
        }
      }
    
      const equipment = equipmentState.find(state => state.id === lastState.equipmentStateId);
      if (equipment) {
        setLastName(equipment.name);
      }
  
      if (!selectedLat || !selectedLon) {
        const defaultLat: number = -19.932574032203036;
        const defaultLon: number = -43.940017558861726;
        setSelectedLat(defaultLat);
        setSelectedLon(defaultLon);
      }
      
    },[equipmentPositionState, selectedLat, selectedLon, selectedValue, returnedValue])

    const setDashboard = () => {
      setDashLoaded(false)
    }
  
    const getEquipmentInfo = () => {
      setSearchClicked(true)

      let equipmentId: unknown = '';
      equipmentId = Object.values(returnedValue)[0];
      let equipmentModelId: unknown = '';
      equipmentModelId = Object.values(returnedValue)[1]
      if (typeof equipmentModelId === 'string') {
        getEquipmentModelPrices(equipmentModelId)
        getEquipmentHistory(equipmentId)
        getEquipmentPositionHistory(equipmentId)
      }
    }
  
    const getEquipmentModelPrices = (equipmentModelId: string) => {
      let myValuesArr: Array<number> = [];
      const equipment = equipmentModel.find(equipment => equipment.id === equipmentModelId);

      if (equipment) {
        equipment.hourlyEarnings.forEach(hourlyEarning => {
          const priceValue = Number(Object.values(hourlyEarning)[1]);
          myValuesArr.push(priceValue);
        });
      }
      setEquipmentModelValue(myValuesArr)
    }

    const getEquipmentHistory = (equipmentId: unknown) => {
      let lastValuesArray: any = []
      let returnedValuesArray: any = []
      let lastKeyOf: any = ''
      for(let key of equipmentStateHistory) {
        if(key.equipmentId === equipmentId) {
          let lastStates = Object.values(key)[1]
          let lastStatesArray = lastStates.slice(lastStates.length - 4);
          lastValuesArray = lastStatesArray
        }
      }
      
  
      for(let i = 0; i < lastValuesArray.length; i++) {
        for(let j = 0; j < equipmentState.length; j++) {
          if(lastValuesArray[i].equipmentStateId === equipmentState[j].id){
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
  
      for(let key of equipmentStateHistory) {
        if (key.equipmentId === equipmentId) {
          lastKeyOf = key.states[key.states.length - 1]
        }
      }
      setEquipmentState(lastKeyOf)
      setEquipmentHistoryArray(returnedValuesArray)
    }
  
    const getEquipmentPositionHistory = (equipmentId: unknown) => {
      let returnedValuesArray: any = []
      for(let i = 0; i < equipmentPositionHistory.length; i++) {
        if(equipmentPositionHistory[i].equipmentId === equipmentId) {
          let lastPositions = Object.values(equipmentPositionHistory[i])[1]
          let lastPositionsArray: any = lastPositions.slice(lastPositions.length - 2);
          for(let j = 0; j < lastPositionsArray.length; j++) {
            const formatedDate = new Date(lastPositionsArray[j].date);
            const dateBr = formatedDate.toLocaleDateString('pt-BR') + ' ' + formatedDate.toLocaleTimeString('pt-BR');
            let newObject: NewObject = {
              date: dateBr,
              position: {
                lat: lastPositionsArray[j].lat,
                lon: lastPositionsArray[j].lon,
              },
            }
            returnedValuesArray.push(newObject)
          }
        }
      }
      setEquipmentPositionHistory(returnedValuesArray)
    }
  
    const getGoogleMapPosition = (lat: number, lon: number) => {
      setSelectedLat(lat);
      setSelectedLon(lon);
    }
  
    return <div className='px-[300px]  bg-[#161616] text-white font-extrabold'>
    <header className='animate__animated animate__fadeIn animate__slow flex justify-between'>
      <div>
        <h1 className='text-4xl text-white pt-[60px]'><span className='text-[#006404]'>Forest</span>Finder</h1>
        <p>Seu aplicativo de localização geográfica florestal</p>
      </div>
      <div className='pt-[60px] cursor-pointer'>
        <span className="text-white p-[10px] ml-4 text-1xl rounded bg-[#006404] mt-[60px]" onClick={setDashboard}>Sair</span>
      </div>
    </header>
    <main className='animate__animated animate__fadeIn animate__slow flex mt-[80px] justify-between'>
      <div>
      <h2>Lista de equipamentos:</h2>
      <select className="text-black h-[30px] w-[190px] my-5" onChange={(e) => {
          setSelectedValue(e.target.value);
          getEquipmentInfo();
        }}>
      {equipments.map(item => (
          <option
          key={item.id} 
          value={item.name} 
          className="text-black"
          selected={item.name === selectedValue}>{item.name}</option>
        ))}
      </select>
      <button onClick={getEquipmentInfo} className="block h-[50px] w-[190px] bg-[#006404] rounded text-white">Pesquisar</button>
      {searchClicked ?
      <div className='bg-black rounded-md p-4 mt-10 animate__animated animate__fadeIn animate__slow --animate-duration 0.5s'>
        <h2 className='text-2xl'>Informações do equipamento:</h2>
        <p>Nome: <span className='text-[#2E80CC]'>{selectedValue}</span></p>
        <p>Status: <span className='text-[#CAB8FD]'>{lastNameState}</span></p>
        <h2 className='text-2xl'>Preço por estado:</h2>
        <p><span className='text-[#2ECC71]'>Operando:</span> {equipmentModelValue[0]} $</p>
        <p><span className='text-[#F1C40F]'>Parado:</span> {equipmentModelValue[1]} $</p>
        <p><span className='text-[#E74C3C]'>Manutenção:</span> {equipmentModelValue[2]} $</p>
  
        <h2 className='text-2xl'>Histórico de estado do equipamento:</h2>
        <ul>
          {equipmentHistoryArray.map((item,index) => (
            <li key={index}>
              <span className='text-[#2E80CC] mr-[10px]'>Data:</span> {item['date']} {'\n'}
              <span className='text-[#2E80CC] mr-[10px]'>Estado:</span> {item['name']}
            </li>
          ))}
        </ul>
        <h2 className='text-2xl'>Posiçôes mais recentes do equipamento:</h2>
        <ul>
          {equipmentPositionState.map((item,index) => (
            <li key={index}>
              <span className='text-[#2E80CC] mr-[10px]'>Data:</span> {item['date']} {'\n'}
              <span className='text-[#2E80CC] mr-[10px10px]'>Local:</span> {item['position']['lat']} {'\n'} {item['position']['lon']}
              {'\n'}
              <button className="text-white p-[10px] ml-4 text-1xl rounded bg-[#006404] mt-2"onClick={() => getGoogleMapPosition(item['position']['lat'], item['position']['lon'])}>Ver no mapa</button>
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