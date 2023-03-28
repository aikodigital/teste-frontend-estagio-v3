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
import 'leaflet-polylinedecorator';
import { PolylineDecorator } from 'leaflet-polylinedecorator';

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
            var cont=0;
            s.positions.forEach((position) => {
                const teste = Object.keys(position.date)
                if ((cont-teste.length)>(13*3)) {
                    allPositions[position.date] = [position.lat, position.lon];   
                }
                cont++;
            });
        }
    });

    //encontre o nome dos states
    const equipmentStateNames = {};
    equipmentState.forEach((equipmentState) => {equipmentStateNames[equipmentState.id] = equipmentState.name;});
    
    // cria uma tabela com todo histórico de estados do props.equipmentId
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
    // define o icone
    const iconMapping = {"Caminhão de carga": FaTruck,"Harvester": GiCircularSawblade,"Garra traçadora": TbBackhoe};
    var iconehist = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(React.createElement(iconMapping[equipmentModelName], { color: 'black', size: 20 })),
        iconSize: [20, 20]            
    })
    // cria todos os markers das posições do props.equipmentId
    const markers = Object.entries(allPositions).map(([date, position]) => (
        <Marker key={date} position={position} icon={iconehist}>
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
        <MapContainer center={props.marker.props.position} zoom={11} style={{ height: '90%', width: '100%' }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
            {props.marker}
            {markers}
            <Polyline pathOptions={{ color: 'red' }} positions={positions}>
                {/* <PolylineDecorator patterns={[{ offset: 0, repeat: 10, symbol: L.Symbol.arrowHead({ pixelSize: 15, pathOptions: { color: 'black', fillOpacity: 1 } }) }]} /> */}
            </Polyline> 
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