import Leaflet from "leaflet";

import caminhao from '../../assets/caminhao.png';
import harvester from '../../assets/combine-harvester.png';
import garraEscavadora from '../../assets/garra-escavadora.png';

const caminhaoIcon = Leaflet.icon({
  iconUrl: caminhao,

  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35]
})

const harvesterIcon = Leaflet.icon({
  iconUrl: harvester,

  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35]
})

const garraEscavadoraIcon = Leaflet.icon({
  iconUrl: garraEscavadora,

  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35]
})

export { caminhaoIcon, harvesterIcon, garraEscavadoraIcon }
