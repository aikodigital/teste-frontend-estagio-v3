import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NewMarker from './NewMarker';

import 'leaflet/dist/leaflet.css'
import "../style/Map.css"

function FilteredMaps({ filter, filterStates, filterTraj, handleClick, equipment, getEquipmentModelName, equipmentPositionHistory, getEquipmentLastState, getEquipmentName, getLastPosition, getFormatedDate, customIcon }) {
    let filteredEquipments = []
    let filteredPositions = []

    if (filter === 1) {
        filterStatesArray()
    }
    else if (filter === 2) {
        filterTrajectoryArray()
    }

    function getFilterStateName() {
        switch (parseInt(filterStates)) {
            case 0:
                return 'Operando';
            case 1:
                return 'Parado';
            case 2:
                return 'Manutenção';
            default:
                return null
        }
    }

    function filterStatesArray() {
        equipment.forEach(item => {
            if (getEquipmentLastState(item.id).props.name === getFilterStateName()) {
                filteredEquipments.push(item)
            }
        });
    }

    function filterTrajectoryArray() {
        let allPos = equipmentPositionHistory.find(item => item.equipmentId === filterTraj)

        // allPos.positions.forEach(element => {
        //     filteredPositions.push([element.lat, element.lon])
        // });

        filteredPositions.push([allPos.positions[0].lat, allPos.positions[0].lon])
        filteredPositions.push([allPos.positions[allPos.positions.length - 1].lat, allPos.positions[allPos.positions.length - 1].lon])

    }

    function calcularMediaUltimasPosicoes() {
        // última posição de cada equipamento
        const ultimasPosicoes = {};
        equipmentPositionHistory.forEach((equipamento) => {
            const ultimaPosicao = equipamento.positions[equipamento.positions.length - 1];
            ultimasPosicoes[equipamento.equipmentId] = [ultimaPosicao.lat, ultimaPosicao.lon];
        });

        // Calcula a média das últimas posições
        const mediaUltimasPosicoes = Object.values(ultimasPosicoes)
            .reduce((acc, curr) => {
                acc[0] += curr[0];
                acc[1] += curr[1];
                return acc;
            }, [0, 0])
            .map((coordenada) => coordenada / Object.keys(ultimasPosicoes).length);

        return mediaUltimasPosicoes;
    }

    // posiciona os equipamentos existentes no mapa, em sua ultima localização
    const equipTotal = filteredEquipments.map((item, i) => {
        return (
            <NewMarker
                handleClick={handleClick}
                getEquipmentModelName={getEquipmentModelName}
                getEquipmentLastState={getEquipmentLastState}
                getEquipmentName={getEquipmentName}
                getLastPosition={getLastPosition}
                getFormatedDate={getFormatedDate}
                customIcon={customIcon}
                key={i}
                eqpId={item.id}
                eqpNameId={item.name}
            />
        )
    });

    return (
        <div className="map--container">
            {filter !== 2 &&
                <MapContainer className='rounded' center={calcularMediaUltimasPosicoes()} zoom={11} style={{ height: '80vh' }} scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {equipTotal}
                </MapContainer>}
            {filter === 2 &&
                <MapContainer className='rounded' center={filteredPositions[1]} zoom={10} style={{ height: '80vh' }} scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline positions={filteredPositions} />
                    <NewMarker
                        handleClick={handleClick}
                        getEquipmentModelName={getEquipmentModelName}
                        getEquipmentLastState={getEquipmentLastState}
                        getEquipmentName={getEquipmentName}
                        getLastPosition={getLastPosition}
                        getFormatedDate={getFormatedDate}
                        customIcon={customIcon}
                        key={filterTraj}
                        eqpId={filterTraj}
                    />
                </MapContainer>}
        </div>
    );
}

export default FilteredMaps