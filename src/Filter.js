import React from 'react';
import {Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipment from './data/equipment.json'
import equipmentModel from './data/equipmentModel.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import ReactDOMServer from 'react-dom/server'; 
import { FaTruck } from 'react-icons/fa';
import { TbBackhoe } from 'react-icons/tb';
import { GiCircularSawblade } from 'react-icons/gi';
import Button from './Button';

function Filter(filter) {
    // Itera sobre cada location e armazena a posição mais recente de cada equipmentId
    const latestPositions = {};
    equipmentPositionHistory.forEach((location) => {const equipmentId = location.equipmentId; const latestPosition = location.positions.reduce((prev, current) => {return (new Date(prev.date) > new Date(current.date)) ? prev : current;
    });

    if (!latestPositions[equipmentId] || new Date(latestPositions[equipmentId].date) < new Date(latestPosition.date)) { latestPositions[equipmentId] = latestPosition;}});

    // Itera sobre cada state e armazena o ultimo estado mais recente de cada equipmentId
    const latestStates = {};
    equipmentStateHistory.forEach((state) => {const equipmentId = state.equipmentId; const latestState = state.states.reduce((prev, current) => {return (new Date(prev.date) > new Date(current.date)) ? prev : current;});

    if (!latestStates[equipmentId] || new Date(latestStates[equipmentId].date) < new Date(latestState.date)) {
    latestStates[equipmentId] = latestState;}});

    //encontra o nome do estado do equipamento
    const equipmentStateNames = {};
    equipmentState.forEach((equipmentState) => {
        equipmentStateNames[equipmentState.id] = equipmentState.name;
    });

    //encontra a cor do estado do equipamento
    const equipmentStateColors = {};
    equipmentState.forEach((equipmentState) => {
        equipmentStateColors[equipmentState.id] = equipmentState.color;
    }); 

    //encontra o nome do equipamento 
    const equipmentNames = {};
    equipment.forEach((equipment) => {
        equipmentNames[equipment.id] = equipment.name;
    });

    //encontra o modelo do equipamento
    const equipmentModelIds = {}
    equipment.forEach((equipment) => {
        equipmentModelIds[equipment.id] = equipment.equipmentModelId;//id do modelo
    });
    const equipmentModelNames = {};
    equipmentModel.forEach((equipmentModel) => {
        equipmentModelNames[equipmentModel.id] = equipmentModel.name;//nome do modelo
    });
    const marcadores = Object.keys(latestPositions).map((equipmentId) => {

        // ícone personalizado para o marcador
        const iconMapping = {"Caminhão de carga": FaTruck,"Harvester": GiCircularSawblade,"Garra traçadora": TbBackhoe};
        const icones = {}
        equipmentModel.forEach((equip) => {
            const icone = iconMapping[equip.name];
                icones[equip.name] = L.divIcon({
                    className: '',
                    html: ReactDOMServer.renderToString(React.createElement(icone, { color: equipmentStateColors[latestStates[equipmentId].equipmentStateId], size: 40 })),
                    iconSize: [40, 40]            
            })
        });
        if (filter===latestStates[equipmentId].equipmentStateId || filter===equipmentModelIds[equipmentId]) {
            return (
                <Marker className='testeid' key={equipmentId} position={[latestPositions[equipmentId].lat, latestPositions[equipmentId].lon]} icon={icones[equipmentModelNames[equipmentModelIds[equipmentId]]]} >
                    <Popup className='popupmap1' options={{ backgroundColor: 'blue'}}>
                        <h2>{equipmentNames[equipmentId]} - {equipmentStateNames[latestStates[equipmentId].equipmentStateId]}</h2>
                        <h3>{equipmentModelNames[equipmentModelIds[equipmentId]]}</h3>
                        <h4>{equipmentId}</h4>
                        <p>Ultima posição informada no dia {new Date(latestPositions[equipmentId].date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                        <p>Ultima estado informado {equipmentStateNames[latestStates[equipmentId].equipmentStateId]} no dia {new Date(latestStates[equipmentId].date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                        <button className='infos' onClick={() => Button(equipmentId, marcadores.filter(Boolean))}>Mais informações</button>
                    </Popup>
                </Marker>
                );
            } else if (filter === null || filter === 'todos') {
                return(
                    <Marker className='testeid' key={equipmentId} position={[latestPositions[equipmentId].lat, latestPositions[equipmentId].lon]} icon={icones[equipmentModelNames[equipmentModelIds[equipmentId]]]} >
                        <Popup className='popupmap1' options={{ backgroundColor: 'blue'}}>
                            <h2>{equipmentNames[equipmentId]} - {equipmentStateNames[latestStates[equipmentId].equipmentStateId]}</h2>
                            <h3>{equipmentModelNames[equipmentModelIds[equipmentId]]}</h3>
                            <h4>{equipmentId}</h4>
                            <p>Ultima posição informada no dia {new Date(latestPositions[equipmentId].date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                            <p>Ultima estado informado {equipmentStateNames[latestStates[equipmentId].equipmentStateId]} no dia {new Date(latestStates[equipmentId].date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                            <button className='infos' onClick={() => Button(equipmentId, marcadores.filter(Boolean))}>Mais informações</button>
                        </Popup>
                    </Marker>
                )
        } 
        
    })
    console.log(marcadores.filter(Boolean))
    return marcadores.filter(Boolean)
}
export default Filter;