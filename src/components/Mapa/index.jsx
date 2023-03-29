import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import histStates from '../../Utils/histEstados'
import fullEquipment from '../../utils/obterDados'
import style from './Mapa.module.scss'

const Mapa = () => {

  const [historico, setHistorico] = useState(false);
  const [historicoEstados, setHistoricoEstados] = useState(null);

  function exibirHist(id) {

    setHistorico(true)

    const histselect = []
  
    histStates.forEach(history => {
      if (history.id === id) {
        histselect.push(history)
      }
    })

    setHistoricoEstados(histselect)
  }

return (
  <div className={style.mapDiv}>
    <MapContainer
      className={style.MapContainer}
      center={[-19.192595, -46.061072]}
      zoom={11}
      scrollWheelZoom={true}
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
            <ul>
              <li><h3>Nome: {equipamento.name}</h3></li>
              <li><h3>Modelo: {equipamento.modelName}</h3></li>
              <li><h3>Estado atual: {equipamento.stateData.name}</h3></li>
              <li>Id: <strong>{equipamento.id}</strong></li>
            </ul>
            <button onClick={() => exibirHist(equipamento.id)}>Ver histórico completo</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <Button/>
    <div>
      {historico && (
      <div>
        <div>
          <h3>Histórico do equipamento: {historicoEstados[0].name}</h3>
          <h3>Id: {historicoEstados[0].id}</h3>
          <button onClick={() => setHistorico(false)}>Fechar Histórico</button>
        </div>
        {historicoEstados[0].historyStates.slice(0).reverse().map((history, index) => ( 
          <div key={index}>
            <h3>Data: <strong>{history.date}</strong></h3>
            <h3>Estado: {history.status}</h3>
          </div>
        ))}
      </div>
    )}
    </div>
  </div>
)
}

export default Mapa