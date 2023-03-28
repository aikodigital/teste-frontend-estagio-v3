
//MAP LIB
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";


//DATA
import equipament from '../../../data/equipment.json'
import equipmentPositionHistory from '../../../data/equipmentPositionHistory.json'

//Components
import Mark from "./Mark";
import Dashboard from "../dashboard/Dashboard";
import iconsDefine from "../utils/IconsDefine";
import MapVerifyFunction from "../utils/MapVerifyFunction";
//import EquipamentProduction from "../utils/EquipamentProduction";


function Map(){

  //EquipamentProduction("a7c53eb1-4f5e-4eba-9764-ad205d0891f9")

return(
    <div>
      <MapContainer center={[equipmentPositionHistory[1].positions[1].lat ,equipmentPositionHistory[1].positions[1].lon]} zoom={10} scrollWheelZoom={true} style={{ height: "100vh", zIndex: 0 }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ZoomControl position="topright" />
          {
            equipament.map((item, indice)=>{
                MapVerifyFunction(item, indice)
                let icon = iconsDefine(MapVerifyFunction(item, indice).name, MapVerifyFunction(item, indice).lastState)
                return(
                    <Mark
                      lastStateId={MapVerifyFunction(item, indice).lastStateId}
                      icon={icon}
                      lat={MapVerifyFunction(item, indice).lastPosition.lat}
                      lon={MapVerifyFunction(item, indice).lastPosition.lon}
                      id={item.id}
                      key={item.id}
                      lastState={MapVerifyFunction(item, indice).lastState}
                      lastStateDate={MapVerifyFunction(item, indice).lastStateDate}
                      name={MapVerifyFunction(item, indice).name}
                      subName={item.name}
                    />
                )
            })
          }
        <Dashboard />
      </MapContainer>
    </div>
)
}export default Map