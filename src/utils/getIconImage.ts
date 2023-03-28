const getIconImage = (equipmentName: string) => {
  switch (equipmentName) {
    case 'CA-0001':
      return require('../assets/img/CA-0001.png');
    case 'CA-0002':
      return require('../assets/img/CA-0002.png');
    case 'CA-0003':
      return require('../assets/img/CA-0003.png');
    case 'CA-0004':
      return require('../assets/img/CA-0004.png');
    case 'HV-1001':
      return require('../assets/img/HV-1001.png');
    case 'HV-1002':
      return require('../assets/img/HV-1002.png');
    case 'GT-2001':
      return require('../assets/img/GT-2001.png');
    case 'GT-2002':
      return require('../assets/img/GT-2002.png');
    case 'GT-2003':
      return require('../assets/img/GT-2003.png');
    default:
      return require('../assets/img/CA-0001.png');
  }
};

export default getIconImage;
