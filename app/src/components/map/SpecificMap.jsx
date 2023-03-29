//HOOKS
import { useState } from "react";


//MAP LIB
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Polyline } from 'react-leaflet/Polyline'

//STYLES
import { Button } from "./StyledMap";

//ROUTER
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

//DATA
import equipament from '../../../data/equipment.json'
import equipmentPositionHistory from '../../../data/equipmentPositionHistory.json'
import equipamentStateHistory from '../../../data/equipmentStateHistory.json'
import equipmentModel from '../../../data/equipmentModel.json'
import equipamentState from '../../../data/equipmentState.json'

//Components
import Mark from "./Mark";
import SpecificHeader from "../header/SpecificHeader";

//UTILS AND FUNCTIONS 
import iconsDefine from "../../utils/IconsDefine";
import EquipamentStatesHours from "../../utils/EquipamentStatesHours";

function SpecificMap(){

  const { id } = useParams();

  const equipamentIndex = equipament.findIndex((i)=> i.id === id )
  const positionIndex  = equipmentPositionHistory.findIndex((i)=> i.equipmentId === id)

  const lastPosition = equipmentPositionHistory[positionIndex].positions[equipmentPositionHistory[positionIndex].positions.length -1]

  const stateIndex = equipamentStateHistory.findIndex((i)=> i.equipmentId === id )
  const lastStateId = equipamentStateHistory[stateIndex].states[equipamentStateHistory[stateIndex].states.length - 1].equipmentStateId
  const lastStateDate = equipamentStateHistory[stateIndex].states[equipamentStateHistory[stateIndex].states.length - 1].date


  const indexState = equipamentState.findIndex((i)=> i.id === lastStateId )
  const lastStateName = equipamentState[indexState].name

  
  const modelIndex = equipmentModel.findIndex((i)=> i.id == equipament[equipamentIndex].equipmentModelId)
  const name = equipmentModel[modelIndex].name
  
  let urlIcon = null

  let icon = iconsDefine(name, lastStateName)
  
  const latLonPopulation = () => {
      let latLon = Array()
      equipmentPositionHistory[positionIndex].positions.slice(-10).map((item)=> {
        latLon.push([item.lat, item.lon])
      })

      return latLon
  }


  //STATES
  const [linesIsVsible, SetLineIsVisible] = useState(false)


  const modelId = equipament[equipamentIndex].equipmentModelId

return(
    <div>

      <SpecificHeader />

      <MapContainer center={[lastPosition.lat ,lastPosition.lon]} zoom={15} scrollWheelZoom={true} style={{ height: "100vh", zIndex: 0 }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <ZoomControl position="topright" />

        <Mark 
            modelId={modelId}
            lastStateId={lastStateId}
            icon={icon}
            lat={lastPosition.lat}
            lon={lastPosition.lon}
            id={id}
            key={id}
            lastState={lastStateName}
            lastStateDate={lastStateDate}      
            name={name}
            subName={equipament[equipamentIndex].name}
            statesHours={EquipamentStatesHours(id)}
        />

        {linesIsVsible &&
          <Polyline 
            positions={latLonPopulation()}
          />
        }
      </MapContainer>

      <Button onClick={()=>{SetLineIsVisible(!linesIsVsible)}}>Alternar Historico de posições</Button>
      
      <div>
        <Button>
              <Link to={`/`}>Mapa Inicial</Link>
        </Button>
      </div>
    </div>
)
}export default SpecificMap