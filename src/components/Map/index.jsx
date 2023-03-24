import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import './Map.css';
import Report from '../Report';
import { eqState } from '../../entities/equipment';
import { DivIcon, Icon, divIcon } from 'leaflet';

const position = [-19, -46];

const icon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',
  iconSize:[50,50]
})

const newIcon = new DivIcon({
  className: 'equipment-icon',
})

const Map = ({equipments}) => {

    const markers = equipments.map( equipment => {
        const color = eqState.filter( state =>{
          if(state.id === equipment.lastState().equipmentStateId){
            return state;
          }
        })[0].color;

        const coordinates = equipment.lastPosition();
        return (
        <Marker
          icon={newIcon}
          key={equipment.id} 
          position={[coordinates.lat, coordinates.lon]}
          >
            <Popup key={equipment.id}>
                <Report key={equipment.id} equipment ={equipment}/>
            </Popup>
        </Marker>);
    })

    return (
        <MapContainer center={position} zoom={11}scrollWheelZoom={false}>
          <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </MapContainer>
      );
}

export default Map;