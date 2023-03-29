import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "../Icon/Index";
import { useSelector } from "react-redux";
import '../../../node_modules/leaflet/dist/leaflet.css';
import styles from './Map.module.scss'

export default function Map() {
    const position = [-19.151801, -46.007759]
    const equipmentList = useSelector(state => state.equipments.equipments)

    const model = useSelector(state => state.map.model)
    const equipState = useSelector(state => state.map.eqState)


    function markerDisplay(name, model, state, coordinate, id, color) {
        return (
        
            <Marker key={id} position={coordinate} icon={Icon(name,color,35)} >
                <Popup>
                    Equipamento: {name} <br />
                    Modelo: {model} <br />
                    Estado: {state}
                </Popup>
            </Marker>
        )
    }
    

    function equipmentDisplay() {
        if (model !== '' && equipState !== '') {
            return equipmentList.filter(equip => equip.model === model && equip.currentState.stateName === equipState).map((equip) => {
                let coordinate = [equip.currentPosition.lat, equip.currentPosition.lon];
                return markerDisplay(equip.name, equip.model, equip.currentState.stateName, coordinate, equip.id, equip.currentState.color)
            })
        } else if (model !== '') {
            return equipmentList.filter(equip => equip.model === model).map((equip) => {
                let coordinate = [equip.currentPosition.lat, equip.currentPosition.lon];
                return markerDisplay(equip.name, equip.model, equip.currentState.stateName, coordinate, equip.id, equip.currentState.color)
            })
        } else if (equipState !== '') { 
            return equipmentList.filter(equip => equip.currentState.stateName === equipState).map((equip) => {
                let coordinate = [equip.currentPosition.lat, equip.currentPosition.lon];
                return markerDisplay(equip.name, equip.model, equip.currentState.stateName, coordinate, equip.id, equip.currentState.color)
            })
        }

        return equipmentList.map((equip) => {
            let coordinate = [equip.currentPosition.lat, equip.currentPosition.lon];
            return markerDisplay(equip.name, equip.model, equip.currentState.stateName, coordinate, equip.id, equip.currentState.color)
        })
    }

    return (
        <div className={styles.pmap}>
            <MapContainer style={{ width: '650px', height: '650px' }} center={position} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {equipmentDisplay()}
            </MapContainer>
        </div>
    )
}