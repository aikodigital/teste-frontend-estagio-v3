import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Equipamentos from '../../../data/equipment.json'
import ModeloEquipamentos from '../../../data/equipmentModel.json'
import PosicaoDosEquipamentos from '../../../data/equipmentPositionHistory.json'
import EstadoEquipamentos from '../../../data/equipmentState.json'
import HistEstadoEqupamentos from '../../../data/equipmentStateHistory.json'

const Mapa = () => {

  const fullEquipment = []

  Equipamentos.forEach(item => {
    let Equipamentos = {}

    ModeloEquipamentos.forEach(equip => {
      if (item.equipmentModelId === equip.id) {
        Equipamentos = {
          name: item.name,
          modelName: equip.name,
          mostRecentState: {},
          stateData: {},
          id: item.id,
          modelId: item.equipmentModelId,
          location: {},
          historyState: [],
          historyPosicion: []
        }
      }
    })
    HistEstadoEqupamentos.forEach(history => {
      if (history.equipmentId === item.id) {
        Equipamentos.historyState.push(history)
        Equipamentos.mostRecentState = (history.states[history.states.length - 1])
      }
    })

    PosicaoDosEquipamentos.forEach(history => {
      if (history.equipmentId === item.id) {
        Equipamentos.historyPosicion.push(history)
        Equipamentos.location = (history.positions[history.positions.length - 1])
      }
    })

    const mostRecentStateId = Equipamentos.mostRecentState.equipmentStateId

    EstadoEquipamentos.forEach(equipamento => {
      if (equipamento.id === mostRecentStateId) {
        Equipamentos.stateData = equipamento;
      }
    })

    fullEquipment.push(Equipamentos)

    return fullEquipment.values
  })

  console.log(fullEquipment)

  return (
    <div className='mapDiv'>
      <MapContainer
        className='MapContainer'
        center={[-19.192595, -46.061072]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "1000px", display: 'flex' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fullEquipment.map(equipamento => (
          <Marker
            key={equipamento.id}
            position={[equipamento.location.lat, equipamento.location.lon]}
          >
            <Popup>
              <h3>{equipamento.name}</h3>
              <h4>{equipamento.modelName}</h4>
              <p>Estado atual do equipamento: {equipamento.stateData.name}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Mapa