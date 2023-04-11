import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-icon.png";
import './MapsPage.css'
import positio from '../equips/equipmentPositionHistory.json';
import infoEstadomaquina from '../equips/equipmentState.json';
import infoequips from '../equips/equipment.json';
import statestory from '../equips/equipmentStateHistory.json';
import equipamentmodel from '../equips/equipmentModel.json';

let butonicon = new L.Icon({
    iconUrl: icon,
    iconShadow: iconShadow,
    iconSize: [40, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
    
});



  
  export interface latlon {
    equipmentId: string;
    positions: {
      date: string;
      lat: number;
      lon: number;
    }[];
  }

  export interface infoEstado {
    id: string;
    name: string;
    color: string;
  }
  
  export interface propiedade {
    equipmentId: string;
    states: {
      date: string;
      equipmentStateId: string;
    }[];
  }
  
  export interface infoequipamento {
    id: string;
    equipmentModelId: string;
    name: string;
  }
  
  export interface modelo {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
  } 

function MapsPage(latlon,infoEstado,propiedade, modelo, infoequipamento ){
    const equipamento: latlon[] = positio.map(linha => {return linha});
    const estado: infoEstado[] = infoEstadomaquina.map(linha => {return linha});
    const equip: infoequipamento[] = infoequips.map(linha => {return linha});
    const equipmodel: modelo[] = equipamentmodel.map(linha => {return linha});
    const state : propiedade[] = statestory.map(linha => {return linha})
    
   
    return (
        <div className="containerDiv">

            <div className="title">
                <h1>Mapa Controle De Equipamentos</h1>
            </div>

            <div id='containermap'>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="idmap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {equipamento.map((linha, index) => {                     
                       let equips=linha.equipmentId; 
                       let equipsdate = linha.positions.slice(-1)[0].date;

                       let estadoId = statestory[index].states.slice(-1)[0].equipmentStateId;
                       let estadoinfo = estado.find(info => info.id === estadoId)
                       let stateName = estadoinfo?.name;


                       let idequipamento =equip.find(info => info.id ===  statestory[index].equipmentId);
                       let nomemaquina = idequipamento?.name;

                       
                                       
                   return(
                    <Marker position={[linha.positions.slice(-1)[0].lat,linha.positions.slice(-1)[0].lon]} icon={butonicon}>
                    <Popup>
                        <span>Name Maquina: {nomemaquina}<br/></span>
                        <span>ID: {equips} <br/></span>
                        <span>Estado: {stateName}<br/></span>
                        <span>Date: {equipsdate}<br/></span>                       
                    </Popup>
                </Marker>
                   )
                })};
                </MapContainer>
            </div>

        </div>
    )
}

export default MapsPage;