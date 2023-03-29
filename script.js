import { meuMarcador } from "./meuMarcador.js";
import { meuMarcador2 } from "./equipamento2.js";
import { meuMarcador3 } from "./equipamento3.js";

let map;



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -19.126536, lng: -45.947756 },
    zoom: 12,
    mapTypeId: "terrain",
    styles: [
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        stylers: [{visibility: 'off'}]
      }
    ]
  });

  const {marker, infoW} = meuMarcador(map);
  
  
  marker.addListener('click', () => {
    infoW.open(map, marker);
  });

  const {marker2, infoW2} = meuMarcador2(map);
  
  
  marker2.addListener('click', () => {
    infoW2.open(map, marker2);
  });

  const {marker3, infoW3} = meuMarcador3(map);
  
  
  marker3.addListener('click', () => {
    infoW3.open(map, marker3);
  });

}


window.initMap = initMap;

