import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import equipment from './data/equipment.json'
import equipmentModel from './data/equipmentModel.json';
import {RiCloseCircleLine} from 'react-icons/ri'
import { FaTruck } from 'react-icons/fa';
import { TbBackhoe } from 'react-icons/tb';
import { GiCircularSawblade } from 'react-icons/gi';
import Legend2 from './Legend2';
import Produtiv from './Produtiv';

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

    //encontra as ultimas posições do props.equipmentId, pois todas deixaria o mapa muito poluido 
    const allPositions = {}; 
    equipmentPositionHistory.forEach((s) => {
        if (s.equipmentId === props.equipmentId) {
            s.positions.forEach((position) => {
                let data1= new Date(position.date);
                let data2= new Date("2021-02-25T00:00:00.000Z");
                if ((data1.getTime())>(data2.getTime())) {
                    allPositions[position.date] = [position.lat, position.lon];   
                }
            });
        }
    });
    //encontre o nome dos states
    const equipmentStateNames = {};
    equipmentState.forEach((equipmentState) => {
        equipmentStateNames[equipmentState.id] = equipmentState.name;
    });
    //encontra a cor dos states
    const equipmentStateColor = {};
    equipmentState.forEach((equipmentState) => {
        equipmentStateColor[equipmentState.id] = equipmentState.color;
    });
    
    // cria uma tabela com todo histórico de estados do props.equipmentId
    const rows = Object.entries(allStates).reverse().map(([date, equipmentStateId]) => (
        <tr key={date}>
            <td >{new Date(date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</td>
            <td style={{backgroundColor:equipmentStateColor[equipmentStateId]}}>{equipmentStateNames[equipmentStateId]}</td>
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

    //defini icones que ficam mais escuros quanto mais recente a posição
    const allDates = Object.entries(allPositions).reverse().map(([date]) => (
        {date}
    ));
    const iconMapping = {"Caminhão de carga": FaTruck,"Harvester": GiCircularSawblade,"Garra traçadora": TbBackhoe};
    const icones= {};
    var cont="0";
    allDates.forEach((def) => {
        var cor=parseInt('1e1e1e', 16)+parseInt(cont, 16);
        icones[def.date]=L.divIcon({
            className: '',
            html: ReactDOMServer.renderToString(React.createElement(iconMapping[equipmentModelName], { color: cor.toString(16), size: 20 })),
            iconSize: [20, 20]            
        })
        cont=(parseInt(cont, 16)+parseInt("0f0f0f", 16)).toString(16)
        
    })


    // cria todos os markers das posições do props.equipmentId
    const markers = Object.entries(allPositions).map(([date, position]) => (
        <Marker key={date} position={position} icon={icones[date]}>
            <Popup>
                <h4>{new Date(date).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</h4>
            </Popup>
        </Marker>
    ));
    // definir as tragetorias
    function getMarkerPositions(allPositions) {
        const sortedPositions = Object.entries(allPositions)
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));
        return sortedPositions.map(([_, position]) => position);
    }
    const positions = getMarkerPositions(allPositions)

    return(
    <div className='mapa2' style={{width:'100%', height:'90vh', position: 'relative'}}>
        <MapContainer center={positions[positions.length-1]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />

            {markers}
            <Polyline pathOptions={{ color: "#333333", dashArray:'10, 5', lineCap: 'triangle', weight: '5' }} positions={positions}>
            </Polyline> 
        </MapContainer>
        < Legend2 iconeb={iconMapping[equipmentModelName]} nameb={equipmentModelName} />
        <div className='tabelainfo'>
            <h1 className='titulo'>{equipmentName} - {equipmentModelName}</h1>
            <div className="closeicondiv" onClick={() => props.Retorna()}>
            {<RiCloseCircleLine className="closeicon"/>}
            </div>
            <h4 className='idmap2'>Id do equipamento: {props.equipmentId}</h4>
            < Produtiv allStates={allStates} equipmentStateNames={equipmentStateNames} equipmentModelId={equipmentModelId}/>
            <table>
                <thead>
                <tr> 
                    <th style={{backgroundColor:'black', textAlign:'center'}} colSpan={2}>Período de calculo</th>
                </tr>
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