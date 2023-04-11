import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { EquipamentContext } from '../ContextData';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { defineIcone, caminhaoDeCargaOperando } from '../Icons';
import { Icon } from 'leaflet';

const Historico = ({ dias }) => {
  const dados = useContext(EquipamentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [horasOperando, setHorasOperando] = useState(0);
  const [estados, setEstados] = useState(null);
  const [posicoes, setPosicoes] = useState(null);
  const { id } = useParams();

  const pegarEstado = (horas) => {
    return horas.map(({ date, equipmentStateId }) => {
      return {
        horas: date.slice(11, 16),
        estado: dados.equipmentState.find(({ id }) => id === equipmentStateId)
          .name,
      };
    });
  };
  const diasArray = Object.entries(dias)
    .map(([dia, horas]) => ({
      dia,
      horas: pegarEstado(horas),
    }))
    .reverse();

  const pegarPosicoesDoDia = (dia) => {
    const { positions } = dados.equipmentPositionHistory.find(
      ({ equipmentId }) => {
        return equipmentId === id;
      }
    );
    const posicoesDoDia = positions.filter(({ date }) => {
      return date.includes(dia);
    });
    const posicoesFinais = posicoesDoDia.map(({ lat, lon }) => {
      return {
        lat,
        lon,
      };
    });
    setPosicoes(posicoesFinais);
  };

  const mostrarDados = (horas, dia) => {
    pegarPosicoesDoDia(dia);
    setEstados(horas);
    const horasTratadas = horas.map(({ horas, estado }) => {
      return {
        horas: Number(horas.slice(0, 2)),
        estado,
      };
    });
    // pega as horas finais caso operando seja o ultimo dado
    const horasFinaisOperando = ({ horas, estado }) => {
      if (estado === 'Operando' || estado === 'operando') {
        return 24 - horas;
      } else {
        return 0;
      }
    };
    const horasPorUltimo = horasFinaisOperando(
      horasTratadas[horasTratadas.length - 1]
    );

    setHorasOperando(pegarHorasOperando(horasTratadas) + horasPorUltimo);
    handleButtonClick();
  };

  const calculaProdutividade = (operando) => {
    return Math.floor((operando / 24) * 100);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const pegarHorasOperando = (dados) => {
    let currentState = dados[0].estado; // estado atual
    let horaInicio = dados[0].horas; // hora de início do intervalo
    let totalTime = 0; // tempo total em horas
    for (let i = 1; i < dados.length; i++) {
      if (dados[i].estado !== currentState) {
        // houve mudança de estado
        const horaFinal = dados[i].horas; // hora de fim do intervalo
        const duration = horaFinal - horaInicio; // duração do intervalo em horas
        if (currentState === 'Operando') {
          // apenas soma o tempo se o estado anterior for 'Operando'
          totalTime += duration;
        }
        // atualiza o estado atual e a hora de início do próximo intervalo
        currentState = dados[i].estado;
        horaInicio = horaFinal;
      }
    }
    return totalTime;
  };

  const colors = {
    Operando: '#2ecc71',
    Parado: '#f1c40f',
    Manutenção: '#e74c3c',
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

  return (
    <Container>
      <HistoricoContainer>
        {diasArray.map(({ dia, horas }) => (
          <Dia key={dia} onClick={() => mostrarDados(horas, dia)}>
            {dia}
          </Dia>
        ))}
      </HistoricoContainer>
      <ModalWrapper isOpen={isOpen} onClick={handleModalClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Title>Histórico por estado</Title>
          <EstadosPorHora>
            <div>Hora</div>
            <div>Estado</div>
            <div>cor</div>
            {estados &&
              estados.map(({ horas, estado }, i) => (
                <React.Fragment key={i}>
                  <p>{horas}</p>
                  <Estado color={colors[estado]}>{estado}</Estado>
                  <Color color={colors[estado]}></Color>
                </React.Fragment>
              ))}
          </EstadosPorHora>
          <HistoricoPosicoes>
            <Title>Histórico de posições</Title>
            {posicoes?.length ? (
              <MapContainer
                center={[posicoes[0].lat, posicoes[0].lon]}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '200px', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    posicoes[posicoes.length - 1].lat,
                    posicoes[posicoes.length - 1].lon,
                  ]}
                  icon={
                    defineIcone(
                      pegarModeloPorEquipamento(id).name,
                      estados[estados.length - 1].estado
                    ) || caminhaoDeCargaOperando
                  }
                ></Marker>
                <Polyline
                  pathOptions={{ color: 'blue' }}
                  positions={posicoes.map(({ lat, lon }) => [lat, lon])}
                  smoothFactor={1.5}
                />
              </MapContainer>
            ) : (
              <NaoPossuiHistorico>
                Este dia não possui históricos de posições
              </NaoPossuiHistorico>
            )}
            <p style={{textAlign: 'center', marginTop: '10px'}}>(O icone representa a ultima posição)</p>
          </HistoricoPosicoes>
          <Produtividade>
            Produtividade: <span>{calculaProdutividade(horasOperando)}%</span>
          </Produtividade>
        </ModalContent>
      </ModalWrapper>
    </Container>
  );
};

export default Historico;

const Container = styled.div``;

const HistoricoContainer = styled.ul`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 40px;
  padding: 20px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

const Dia = styled.li`
  padding: 20px;
  text-align: center;
  transition: 0.3s;
  position: relative;
  cursor: pointer;
  &:hover {
    background: #bceeb0;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #003184;
`;

const EstadosPorHora = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  gap: 5px;
  padding: 10px;
  margin-bottom: 20px;
  div {
    margin-bottom: 10px;
  }
`;

const Estado = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Color = styled.span`
  background: ${({ color }) => color};
  width: 10px;
  height: 10px;
  justify-self: center;
`;

const Produtividade = styled.h3`
  color: #003184;
  margin-top: 20px;
  span {
    font-size: 24px;
  }
`;

const HistoricoPosicoes = styled.div``;

const NaoPossuiHistorico = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 40px 0px;
`;
