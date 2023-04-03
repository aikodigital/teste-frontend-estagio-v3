import iconeCaminhao from '../assets/caminhao.png'
import iconeGarra from '../assets/garra.png'
import iconeHarvester from '../assets/harvester.png'
import L from 'leaflet'

export default function modeloIcone (modeloNome) {
  let urlIcon = null
  if(modeloNome === 'Caminhão de carga') {
    urlIcon = iconeCaminhao
  } else if (modeloNome === 'Garra traçadora') {
    urlIcon = iconeGarra
  } else if(modeloNome === 'Harvester') { 
    urlIcon = iconeHarvester
  } else {
    console.log("Erro!!");
  }
  
  let icon = null

  return icon = L.icon({
      iconUrl: urlIcon,

      iconSize:     [40, 40],
      shadowSize:   [50, 64], 
      iconAnchor:   [22, 94], 
      shadowAnchor: [4, 62],  
      popupAnchor:  [-3, -76] 
  })
}