import Button from '../Button';
import { eqState } from '../../entities/equipment';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css';

const Map = (props) => {
  const reportCoordinates = props.report!= null ? props.report.lastPosition() : {lat: -19, lon: -46};

  const position = [reportCoordinates.lat, reportCoordinates.lon];
  const zoom = props.zoom;
  const setReport= props.setReport;

  function SetPreview (){
    const map = useMap();
    map.setView(position, zoom)

    return ;
  }
  const equipments = props.equipments;
  const markers = equipments.map(equipment => {
    
    const state = eqState.filter(state => {
      if (state.id === equipment.lastState().equipmentStateId) {
        return state;
      }
    })[0].name;

    const model = equipment.modelName;
    const selected = props.report != null && equipment.name == props.report.name? 'marker-selected': '';

    const coordinates = equipment.lastPosition();
    const icon = new Icon({
      iconUrl: `./${model}_${state}.svg`,
      iconSize: [75, 75],
      iconAnchor: [32, 60],
      popupAnchor: [0, -75],
      className: `${equipment.id} ${selected}`,
    })
    
    return (
        <Marker
          autoPanOnFocus={true}
          icon={icon}
          key={equipment.id}
          position={[coordinates.lat, coordinates.lon]}
        >
        </Marker>
      );

  })

  const onReport = e =>{
    const target = e.target;
    if(target.localName === 'img' && target.classList[0] === 'leaflet-marker-icon'){
      const equipment = equipments.filter(eq => eq.id === target.classList[1])[0];
      setReport(equipment);
    }
  }

  return (
    <section className='container map-container' onClick={onReport}>
    <MapContainer center={[-19, -46]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
      <SetPreview/>
    </MapContainer>
    </section>
  );
}

export default Map;