import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import './Map.css';
import Report from '../Report';

const position = [-19, -46];


const Map = ({equipments}) => {

    const markers = equipments.map( equipment => {
        const coordinates = equipment.lastPosition();
        console.log(coordinates)
        return (
        <Marker key={equipment.id} position={[coordinates.lat, coordinates.lon]}>
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