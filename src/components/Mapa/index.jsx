import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import histStates from '../../Utils/histEstados'
import fullEquipment from '../../Utils/obterDados'
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
    <>
      <header className={style.header}>
        <h1>Mapa dos equipamentos</h1>
      </header>
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
                  <li><h4>Id: {equipamento.id}</h4></li>
                </ul>
                <div>
                  <Button
                    onClick={() => exibirHist(equipamento.id)}
                    variant="outlined"
                    color="info"
                    size='small'
                  >
                    Ver histórico completo
                  </Button>
                </div>

              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div>
          {historico && (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <div className={style.tabelaCabeca}>
                <h3>Histórico de ({historicoEstados[0].name})</h3>
                <Button
                  variant="outlined"
                  color="error"
                  size='small'
                  onClick={() => setHistorico(false)}
                >
                  Fechar
                </Button>
              </div>
              <TableContainer sx={{ maxHeight: 440 }} className={style.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historicoEstados[0].historyStates.slice(0).reverse().map((history, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{history.date}</TableCell>
                        <TableCell>{history.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </div>
      </div>
      <footer className={style.footer}>
        <p>Criado e desenvolvido por: Vinicius Felipe</p>
      </footer>
    </>
  )
}

export default Mapa