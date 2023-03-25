import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../img/truck.svg';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import NewMarker from './NewMarker';

import 'leaflet/dist/leaflet.css'
import "../style/Map.css"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon + "?cor=#2ecc71",
    iconUrl: icon + "?cor=#2ecc71",
    shadowUrl: iconShadow,

    iconSize: [50, 105], // Tamanho do icone
    popupAnchor: [20, -10], // Posição do popup relativa ao icone
});

//- data.find(item => item.id === itemId);

function Map({ equipment, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory }) {
    const position = [-19.126536, -45.947756]

    // posiciona os equipamentos existentes no mapa, em sua ultima localização
    const equipTotal = equipment.map((item, i) => {
        return (
            <NewMarker
                key={i}
                eqpId={item.id}
                eqpNameId={item.name}
                equipmentModel={equipmentModel}
                allPosHistory={equipmentPositionHistory}
                equipmentState={equipmentState}
                allStateHistory={equipmentStateHistory}
            />
        )
    });

    return (
        <div className="map--container">
            <MapContainer className='rounded' center={position} zoom={10} style={{ height: '80vh' }} scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {equipTotal}
            </MapContainer>
        </div>
    );
}

export default Map