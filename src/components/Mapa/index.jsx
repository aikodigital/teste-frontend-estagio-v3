import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import histStates from '../../Utils/histEstados'
import fullEquipment from '../../utils/obterDados'

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

    return console.log(histselect);
  }

  //console.log(fullEquipment)

  //console.log(histStates);

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
            <h3>Nome: {equipamento.name}</h3>
            <h4>Modelo: {equipamento.modelName}</h4>
            <h5><strong>{equipamento.id}</strong></h5>
            <p>Estado atual: {equipamento.stateData.name}</p>
            <button onClick={() => exibirHist(equipamento.id)}>Ver histórico completo</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <div>
      {historico && (
      <div>
        <div>
          <h3>Histórico do equipamento {historicoEstados[0].name}</h3>
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