import './App.css'
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import EquipmentJsonState from '../data/equipmentState.json' 
import Sidebar from './Components/Sidebar/Sidebar'
import { marker, map } from 'leaflet'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import moment from 'moment/moment'
import { EquipmentService } from './services/EquipmentService'
import EquipmentTrajectoryModal from './Components/EquipmentTrajectoryModal/EquipmentTrajectoryModal';

function App() {
  const [equipments, setEquipments] = useState([])
  const [map, setMap] = useState(null)
  const [isTrajectoryModalVisible, setIsTrajectoryModalVisible] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState({})

  const markerRefs = useRef({})

  useEffect(() => {
    const equipments = EquipmentService.getEquipments()
    setEquipments(equipments)
  }, [])

  function openModal(history) {
    let html = ''
    history.forEach(historyElement => {
      const state = EquipmentJsonState.find(e => e.id === historyElement.equipmentStateId)
      html += `<p>${state.name} <span>${moment(historyElement.date).format('DD/MM/YYYY hh:mm:ss')}</span> </p>`
    });

    Swal.fire({
      icon: 'info',
      title: 'Histórico de estados do equipamento',
      html: html,
      confirmButtonColor: "#3186b2"
    })
  }

  function getMarkerIcon(id) {
    const icons = {
      'a3540227-2f0e-4362-9517-92f41dabbfdf': blueIcon,
      'a4b0c114-acd8-4151-9449-7d12ab9bf40f': yellowIcon,
      '9c3d009e-0d42-4a6e-9036-193e9bca3199': orangeIcon
    }

    return icons[id];
  }

  const blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconRetinaUrl: marker,
      popupAnchor:  [-0, -0],
      iconSize: [32,45],     
  })
  
  const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],
        
  })

  const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45]  
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  function onChangeStateFilter(states) {
    const allEquipments = EquipmentService.getEquipments()
    const filteredEquipments = allEquipments.filter(equipment => states.includes(equipment.state.name))

    setEquipments(filteredEquipments)
  }

  function onChangeEquipmentFilter(name) {
    const equipment = equipments.find(equipment => equipment.name === name)

    map.flyTo([equipment.lat, equipment.lon], 12)

    const markerToOpen = markerRefs.current[name]
    markerToOpen.openPopup()
  }

  return (
    <div className='body-main'>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MapContainer center={[-19, -46]} zoom={9} scrollWheelZoom={true} ref={setMap}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {equipments.map(equipment => (
              <Marker 
                icon={getMarkerIcon(equipment.equipmentModelId)}
                position={[equipment.lat, equipment.lon]}
                ref={(m) => markerRefs.current[equipment.name] = m}
              >
                <Popup className='popup'>
                  <p>{equipment.equipmentModel.name}</p>
                  <p>{equipment.name}</p>
                  <p>{equipment.state.name}</p>
                  <button className="button-details" onClick={() => openModal(equipment.stateHistory.states)}>Visualizar histórico de estados</button>
                  <button className="button-details" onClick={() => { setIsTrajectoryModalVisible(!isTrajectoryModalVisible); setSelectedEquipment(equipment) }}>Visualizar trajetória</button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <Sidebar stateFilterCallback={onChangeStateFilter} equipmentFilterCallback={onChangeEquipmentFilter} />
          {isTrajectoryModalVisible && (
            <EquipmentTrajectoryModal 
              closeModal={() => setIsTrajectoryModalVisible(false)}
              positions={selectedEquipment?.equipmentPositionHistory?.positions}
            />
          )}
        </ThemeProvider>
      </div>
  ) 
}

export default App