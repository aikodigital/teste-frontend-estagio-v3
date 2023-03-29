import { useEffect, useState } from 'react'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { GrFormClose } from 'react-icons/gr'
import './index.css'
import { marker } from 'leaflet'

function EquipmentTrajectoryModal({ closeModal, positions }) {
  const [map, setMap] = useState()
  const [equipmentPositions, setEquipmentPositions] = useState()

  useEffect(() => {
    const formattedPositions = positions?.map(position => [position.lat, position.lon])
    setEquipmentPositions(formattedPositions)
  }, [positions])

  console.log('positions', positions)

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
  })

  const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],
        
  })

  const greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45]  
  })

  console.log('equipmentPositions', equipmentPositions)

  return (
    <div className="equipment-trajectory-modal">
      <div className="equipment-trajectory-modal-container">
        <div className="equipment-trajectory-modal-header">
          <div />
          <span>Trajetória do equipamento</span>
          <span onClick={closeModal} style={{ cursor: 'pointer' }}><GrFormClose /></span>
        </div>
        <MapContainer center={[positions[0].lat, positions[0].lon]} zoom={16} scrollWheelZoom={true} ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {equipmentPositions?.map((position, index) => {
            let icon = greyIcon
            if (index === 0) icon = redIcon
            if (index === equipmentPositions.length - 1) icon = goldIcon

            return <Marker
              icon={icon}
              position={position}
            />
          })}
          <Polyline positions={equipmentPositions} color={'grey'} />
        </MapContainer>
        <div className="equipment-trajectory-modal-footer">
          <div><span className="trajectory-start">Início</span></div>
          <div><span className="trajectory-end">Final</span></div>
        </div>
      </div> 
    </div>
  )
}

export default EquipmentTrajectoryModal