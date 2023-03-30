export default function iconsDefine (name, state) {
    let urlIcon = null
    const CA = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../public/icons/CA-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../public/icons/CA-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../public/icons/CA-MA.svg'
        break;

      default:
        console.log('Erro!');
      }
    }

    const HA = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../public/icons/HA-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../public/icons/HA-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../public/icons/HA-MA.svg'
        break;

      default:
        console.log('Erro!');
      }
    }

    const GT = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../public/icons/GT-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../public/icons/GT-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../public/icons/GT-MA.svg'
        break;

      default:
        console.log('Erro!');
      }
    }

    
    switch (name) {
        case 'Caminhão de carga':
          CA(state)
          break;

        case 'Harvester':
          HA(state)
          break;

        case 'Garra traçadora':
          GT(state)
          break;

        default:
          console.log('Erro!');
    }
    let icon = null

    return icon = L.icon({
        iconUrl: urlIcon,
        iconSize: [130, 150],
        iconAnchor: [65, 115],
        popupAnchor: [0, -50]

    })

}