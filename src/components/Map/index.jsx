import { MapContainer, TileLayer} from 'react-leaflet';
import './Map.css';

const position = [-20, -50];

const Map = () => {
    return (
        <MapContainer center={position} zoom={12}scrollWheelZoom={false}>
          <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      );
}

export default Map;