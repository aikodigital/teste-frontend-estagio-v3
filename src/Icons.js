import { Icon } from 'leaflet';

export const harvesterManutencao = new Icon({
  iconUrl: '../src/assets/harvester-manutencao.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const harvesterOperando = new Icon({
  iconUrl: '../src/assets/harvester-operando.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const harvesterParado = new Icon({
  iconUrl: '../src/assets/harvester-parado.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const garraTracadoraManutencao = new Icon({
  iconUrl: '../src/assets/garra-tracadora-manutencao.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const garraTracadoraOperando = new Icon({
  iconUrl: '../src/assets/garra-tracadora-operando.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const garraTracadoraParado = new Icon({
  iconUrl: '../src/assets/garra-tracadora-parado.svg',
  iconSize: [35, 35],
  iconAnchor: [15, 30],
});

export const caminhaoDeCargaManutencao = new Icon({
  iconUrl: '../src/assets/caminhao-de-carga-manutencao.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export const caminhaoDeCargaOperando = new Icon({
  iconUrl: '../src/assets/caminhao-de-carga-operando.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export const caminhaoDeCargaParado = new Icon({
  iconUrl: '../src/assets/caminhao-de-carga-parado.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export const defineIcone = (modelo, estado) => {
  if (modelo && estado) {
    const nomeModelo = modelo.toLowerCase();
    const nomeEstado = estado.toLowerCase();
    if (nomeModelo === 'caminhão de carga') {
      if (nomeEstado === 'manutenção') {
        return caminhaoDeCargaManutencao;
      }
      if (nomeEstado === 'operando') {
        return caminhaoDeCargaOperando;
      }
      if (nomeEstado === 'parado') {
        return caminhaoDeCargaParado;
      }
    }
    if (nomeModelo === 'harvester') {
      if (nomeEstado === 'manutenção') {
        return harvesterManutencao;
      }
      if (nomeEstado === 'operando') {
        return harvesterOperando;
      }
      if (nomeEstado === 'parado') {
        return harvesterParado;
      }
    }
    if (nomeModelo === 'garra traçadora') {
      if (nomeEstado === 'manutenção') {
        return garraTracadoraManutencao;
      }
      if (nomeEstado === 'operando') {
        return garraTracadoraOperando;
      }
      if (nomeEstado === 'parado') {
        return garraTracadoraParado;
      }
    } else {
      return null;
    }
  }
};