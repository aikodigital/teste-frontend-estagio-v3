import Report from '../Report';

import { eqState } from '../../entities/equipment';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useMap } from 'react-leaflet';
import './Map.css';

console.log(eqState)
const Map = (props) => {
  const position = props.position;
  const zoom = props.zoom;
  
  function SetPreview (){
    const map = useMap();
    map.setView(position, zoom)

    return ;
  }
  
  
  const equipments = props.equipments;
  const markers = equipments.map(equipment => {
    console.log(equipment.modelName)

    const state = eqState.filter(state => {
      if (state.id === equipment.lastState().equipmentStateId) {
        return state;
      }
    })[0].name;

    const model = equipment.modelName;

    const coordinates = equipment.lastPosition();
    console.log(`./${model}_${state}.svg`)
    const icon = new Icon({
      iconUrl: `./${model}_${state}.svg`,
      iconSize: [75, 75],
      iconAnchor: [32, 60],
      popupAnchor: [0, -75],
      className: `${state}`,

    })
    return (

      <Marker
        icon={icon}
        key={equipment.id}
        position={[coordinates.lat, coordinates.lon]}
      >
        <Popup key={equipment.id}>
          <Report key={equipment.id} equipment={equipment} />
        </Popup>
      </Marker>);
  })
  return (
    <MapContainer center={[-19, -46]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
      <SetPreview/>
    </MapContainer>
  );
}

export default Map;