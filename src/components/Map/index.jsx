import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import './Map.css';
import Report from '../Report';
import { eqState } from '../../entities/equipment';
import { DivIcon, Icon } from 'leaflet';

console.log(eqState)

const position = [-19, -46];



const Map = ({equipments}) => {

    const markers = equipments.map( equipment => {
        const state = eqState.filter( state =>{
          if(state.id === equipment.lastState().equipmentStateId){
            return state;
          }
        })[0].name;

        const coordinates = equipment.lastPosition();

        const icon = new Icon({
          iconUrl: `./marker_${state}.svg`,
          iconSize: [50,90],
          className: `${state}`,
          
        })
        console.log(state)
        return (

        <Marker
          icon={icon}
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