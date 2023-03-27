import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import ReactDOMServer from 'react-dom/server';
// import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import equipment from './data/equipment.json'
import equipmentModel from './data/equipmentModel.json';
import {RiCloseCircleLine} from 'react-icons/ri'

function Map2(props){
    //encontra todas os estados do props.equipmentId
    const allStates = {}; 
    equipmentStateHistory.forEach((s) => {
        if (s.equipmentId === props.equipmentId) {
            s.states.forEach((state) => {
                allStates[state.date] = state.equipmentStateId;
            });
        }
    });

    //encontre o nome dos states
    const equipmentStateNames = {};
    equipmentState.forEach((equipmentState) => {equipmentStateNames[equipmentState.id] = equipmentState.name;});
    
    const rows = Object.entries(allStates).reverse().map(([date, equipmentStateId]) => (
        <tr key={date}>
        <td>{new Date(date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</td>
        <td>{equipmentStateNames[equipmentStateId]}</td>
        </tr>
    ));

    //encontra o nome do equipamento 
    var equipmentName;
    equipment.forEach((equipment) => {
        if (equipment.id === props.equipmentId) {
            equipmentName = equipment.name;
        }   
    });

    //encontra o modelo do equipamento
    var equipmentModelId;
    equipment.forEach((equipment) => {
        if (equipment.id === props.equipmentId) {
            equipmentModelId = equipment.equipmentModelId;//id do modelo 
        }
    });
    var equipmentModelName;
    equipmentModel.forEach((equipmentModel) => {
        if (equipmentModel.id === equipmentModelId) {
            equipmentModelName = equipmentModel.name;//nome do modelo
        }
    })
       
    console.log(allStates)
    return(
    <div className='mapa2' style={{width:'100%', height:'90vh', position: 'relative'}}>
        <MapContainer center={props.marker.props.position} zoom={11} style={{ height: '90%', width: '100%' }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
            {props.marker}
        </MapContainer>
        <div className='tabelainfo'>
            <h1 className='titulo'>{equipmentName} - {equipmentModelName}</h1>
            <div className="closeicondiv" onClick={() => props.Retorna()}>
            {<RiCloseCircleLine className="closeicon"/>}
            </div>
            <h4 className='idmap2'>Id do equipamento: {props.equipmentId}</h4>
            <table>
                <thead>
                <tr>
                    <th>Histórico</th>
                    <th>Estado do equipamento</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
        
    </div>
    );
}
export default Map2;