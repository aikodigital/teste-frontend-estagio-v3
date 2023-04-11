import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { pegarDataMaisRecente } from '../helper/FunctionsHelper';
import { EquipamentContext } from '../ContextData';
import styled from 'styled-components';
import { defineIcone, garraTracadoraOperando } from '../Icons';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Garra } from '../assets/garra-tracadora-operando.svg';
import { ReactComponent as Harvester } from '../assets/harvester-operando.svg';
import { ReactComponent as Caminhao } from '../assets/caminhao-de-carga-operando.svg';

const Maps = ({ estado }) => {
  const dados = useContext(EquipamentContext);
  const navigate = useNavigate();

  if (
    !dados.equipment ||
    !dados.equipmentModel ||
    !dados.equipmentPositionHistory ||
    !dados.equipmentState ||
    !dados.equipmentStateHistory
  ) {
    return null;
  }

  // posição inicial do mapa colocado na propriedade center do MapContainer
  const posicaoInicialDados = dados.equipmentPositionHistory?.[0]?.positions;
  const posicaoInicial = () => {
    return pegarDataMaisRecente(posicaoInicialDados);
  };
  const cordenadasInicais = [posicaoInicial()?.lat, posicaoInicial()?.lon];

  const pegarEstadoMaisRecente = (equipmentId) => {
    const equipamento = dados.equipmentStateHistory.find((dado) => {
      return equipmentId === dado.equipmentId;
    });
    const estadoRecenteId = pegarDataMaisRecente(equipamento.states);
    const estadoRecente = dados.equipmentState.find((dado) => {
      return estadoRecenteId.equipmentStateId === dado.id;
    });
    return estadoRecente;
  };

  const pegarModeloPorEquipamento = (equipmentId) => {
    const equipamento = dados.equipment.find((dado) => {
      return equipmentId === dado.id;
    });
    const modeloAtual = dados.equipmentModel.find(({ id }) => {
      return equipamento.equipmentModelId === id;
    });
    return modeloAtual;
  };

  const pegarNomeDoEquipamento = (equipmentId) => {
    const equipamento = dados.equipment.find((dado) => {
      return equipmentId === dado.id;
    });
    return equipamento.name;
  };

  const cordenadasRecentes = () => {
    const equipamentosDados = dados.equipmentPositionHistory.map(
      ({ equipmentId, positions }) => {
        const recente = pegarDataMaisRecente(positions);
        recente.cordenadas = [recente.lat, recente.lon];
        recente.equipmentId = equipmentId;
        recente.estado = pegarEstadoMaisRecente(equipmentId);
        recente.modelo = pegarModeloPorEquipamento(equipmentId);
        recente.name = pegarNomeDoEquipamento(equipmentId);
        return recente;
      }
    );
    return equipamentosDados;
  };

  const cordenadasRecentesFiltrado = cordenadasRecentes().filter((dados) => {
    if (estado === 'all') return true;
    const estadoAtual = dados.estado.name;
    return estado.toLowerCase() === estadoAtual.toLowerCase();
  });

  const irParaPaginaEquipment = (equipmentId) => {
    navigate(`equipamento/${equipmentId}`);
  };

  return (
    <Container>
      <MapContainer
        center={cordenadasInicais}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cordenadasRecentesFiltrado.map(
          ({ cordenadas, estado, modelo, name, equipmentId }, i) => (
            <Marker
              position={cordenadas}
              icon={
                defineIcone(modelo?.name, estado?.name) ||
                garraTracadoraOperando
              }
              key={i}
            >
              <Popup offset={[0, -15]}>
                <PopupContainer>
                  <h3>{name}</h3>
                  <h4>Posição</h4>
                  <p>Latitude: {cordenadas[0]}</p>
                  <p>Longitude: {cordenadas[1]}</p>
                  <Button onClick={() => irParaPaginaEquipment(equipmentId)}>
                    Ver Histórico
                  </Button>
                </PopupContainer>
              </Popup>
              <Tooltip>
                <EstadoTooltip color={estado?.color}>
                  Estado: {estado?.name}
                </EstadoTooltip>
              </Tooltip>
            </Marker>
          )
        )}
      </MapContainer>
      <h2 style={{textAlign: 'center', marginTop: '20px', color: '#003184'}}>Legenda</h2>
      <Legenda>
        <p>Modelo</p>
        <p>Estado</p>
        <Icones>
          <Caminhao />
          Caminão de carga
        </Icones>
        <EstadoTitle color={'#2ecc71'}>Operando</EstadoTitle>
        <Icones>
          <Garra />
          Garra traçadora
        </Icones>
        <EstadoTitle color={'#f1c40f'}>Parado</EstadoTitle>
        <Icones>
          <Harvester />
          Haverster
        </Icones>
        <EstadoTitle color={'#e74c3c'}>Manutenção</EstadoTitle>
      </Legenda>
    </Container>
  );
};

export default Maps;

const Container = styled.div`
  padding: 20px 0px;
  position: relative;
`;

const IconComponent = styled.div`
  path {
    fill: ${({ color }) => color};
  }
`;

const EstadoTooltip = styled.div`
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    background: ${({ color }) => color};
    margin-left: 10px;
  }
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 0px;
    padding: 0px;
  }
`;

const Button = styled.button`
  color: #fff;
  background: #00df00;
  font-weight: bold;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const Legenda = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  svg {
    height: 20px;
    width: 20px;
  }
  path,
  rect {
    fill: #487432;
  }
  p {
    margin-bottom: 15px;
  }
`;

const Icones = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EstadoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    background: ${({ color }) => console.log(color)};
    background: ${({ color }) => color};
  }
`;
