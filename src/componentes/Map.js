import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NewMarker from './NewMarker';

import 'leaflet/dist/leaflet.css'
import "../style/Map.css"

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