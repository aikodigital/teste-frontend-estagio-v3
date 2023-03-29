export default function iconsDefine (name, state) {
    let urlIcon = null
    const CA = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../../assets/icons/CA-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../../assets/icons/CA-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../../assets/icons/CA-MA.svg'
        break;

      default:
        console.log(Error);
      }
    }

    const HA = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../../assets/icons/HA-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../../assets/icons/HA-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../../assets/icons/HA-MA.svg'
        break;

      default:
        console.log(`Sorry, we are out of ${expr}.`);
      }
    }

    const GT = (sate) => {
      switch(state){
        case 'Operando':
        urlIcon = '../../../assets/icons/GT-OP.svg'
        break;

      case 'Parado':
        urlIcon = '../../../assets/icons/GT-PA.svg'
        break;

      case 'Manutenção':
        urlIcon = '../../../assets/icons/GT-MA.svg'
        break;

      default:
        console.log(`Sorry, we are out of ${expr}.`);
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