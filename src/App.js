import React, { useState } from 'react';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Header from "./componentes/Header"
import Map from "./componentes/Map"
import MoreInfoPage from "./componentes/MoreInfoPage"

import equipment from "./data/equipment.json"
import equipmentModel from "./data/equipmentModel.json"
import allPosHistory from "./data/equipmentPositionHistory.json"
import equipmentState from "./data/equipmentState.json"
import allStateHistory from "./data/equipmentStateHistory.json"

import operandoImg from './img/operando.svg'
import manutencaoImg from './img/manutencao.svg'
import paradoImg from './img/parado.svg'

import "./style/App.css";

function App() {
  const [idToShow, setIdToShow] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleClick = (id) => {
    setIdToShow(id)
    setShowMoreInfo(true);
  }

  const handleClose = () => {
    setShowMoreInfo(false);
  }

  function getFormatedDate(getEquipmentLastState) {
    const date = new Date(getEquipmentLastState.date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
      hour12: false,
      timeZone: 'UTC'
    };
    return date.toLocaleDateString('pt-BR', options);
  }

  function getEquipmentName(eqpNameId) {
    const eqpName = equipment.find(item => item.id === eqpNameId);

    return eqpName.name
  }

  function getEquipmentModelName(eqpId) {
    const modelId = equipment.find(item => item.id === eqpId).equipmentModelId;

    const modelName = equipmentModel.find(item => item.id === modelId).name
    return modelName;
  }

  function getLastPosition(eqpId) {
    // encontra o id do equipamento na lista
    const item = allPosHistory.find(item => item.equipmentId === eqpId);
    // retorna a ultima posição salva, caso exista
    if (item) {
      const lastPosition = item.positions[item.positions.length - 1];
      return [lastPosition.lat, lastPosition.lon];
    }
    return null;
  }

  function getEquipmentLastStateColor(eqpId) {
    let lastState = {}

    // encontra o id do equipamento na lista
    const item = allStateHistory.find(item => item.equipmentId === eqpId);

    // retorna a ultima posição salva, caso exista
    if (item) {
      lastState = item.states[item.states.length - 1];
      const item2 = equipmentState.find(item => item.id === lastState.equipmentStateId);
      switch (item2.color) {
        case "#2ecc71":
          return operandoImg
        case "#f1c40f":
          return paradoImg
        case "#e74c3c":
          return manutencaoImg
        default:
          return null
      }
    }
    else {
      return null;
    }
  }

  function getEquipmentLastState(eqpId) {
    let lastState = {}

    // encontra o id do equipamento na lista
    const item = allStateHistory.find(item => item.equipmentId === eqpId);

    // retorna a ultima posição salva, caso exista
    if (item) {
      lastState = item.states[item.states.length - 1];
      const item2 = equipmentState.find(item => item.id === lastState.equipmentStateId);
      lastState = {
        ...lastState,
        props: {
          ...item2, style: {
            color: item2.color
          }
        }
      }
      return lastState;
    }
    else {
      return null;
    }
  }

  function customIcon(eqpId) {
    const aux = L.icon({
      iconUrl: getEquipmentLastStateColor(eqpId),
      iconSize: [50, 105],
      iconAnchor: [25, 52.5],
      popupAnchor: [0, -30],
      shadowUrl: iconShadow,
      shadowSize: [68, 95],
      shadowAnchor: [12, 74]
    });
    return aux
  }

  return (
    <div className="App">
      <Header />
      {!showMoreInfo && (<Map
        handleClick={handleClick}
        equipment={equipment}
        getFormatedDate={getFormatedDate}
        equipmentPositionHistory={allPosHistory}
        equipmentState={equipmentState}
        equipmentStateHistory={allStateHistory}
        getEquipmentModelName={getEquipmentModelName}
        getEquipmentLastState={getEquipmentLastState}
        getEquipmentName={getEquipmentName}
        getLastPosition={getLastPosition}
        customIcon={customIcon}
      />)}
      {showMoreInfo && (
        <MoreInfoPage
          id={idToShow}
          handleClose={handleClose}
          getEquipmentName={getEquipmentName}
          getLastPosition={getLastPosition}
          getEquipmentModelName={getEquipmentModelName}
          getEquipmentLastState={getEquipmentLastState}
          equipmentStateHistory={allStateHistory}
          getFormatedDate={getFormatedDate}
          equipment={equipment}
          equipmentModel={equipmentModel}
          equipmentState={equipmentState}
          getEquipmentLastStateColor={getEquipmentLastStateColor}
        />
      )}
    </div>
  );
}

export default App;
