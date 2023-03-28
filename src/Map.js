import React, { useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import Legend from './Legend.js';
import Filter from './Filter'


function Map(props) {
    
    // posição inicial do mapa
    const [position] = useState([-19.1401, -46.007759]); 

    

    // Cria os marcadores com as posições mais recentes de cada equipmentId
    
    const markers = Filter(props.filter)
        
    return (
        <div className='mapa' style={{width:'100%', height:'90vh', position: 'relative'}}>   
            <MapContainer center={position} zoom={10.5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
                />
                {markers}
            </MapContainer>
            <Legend />
        </div>
    );
}

export default Map;