import styled, { keyframes } from "styled-components";

import equipmentModel from "../data/equipmentModel.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

export default function Equipamento({ eqID, modelID, name }) {
  const [cardVirado, setCardVirado] = useState(false);
  const [flipBack, setFlipBack] = useState(false);
  const [flipFront, setFlipFront] = useState(false);

  const dadosModelo = equipmentModel.find((obj) => obj.id === modelID);
  const dadosStates = equipmentStateHistory.find(
    (obj) => obj.equipmentId === eqID
  );
  const dadosPositions = equipmentPositionHistory.find(
    (obj) => obj.equipmentId === eqID
  );

  const allStates = equipmentStateHistory.find(
    (obj) => obj.equipmentId === eqID
  );

  const last10States = allStates.states
    .slice(allStates.states.length - 10, allStates.states.length)
    .reverse();

  const lastState =
    dadosStates.states[dadosStates.states.length - 1].equipmentStateId;
  const lastStateDate = dadosStates.states[dadosStates.states.length - 1].date;

  const lastPosition = [
    dadosPositions.positions[dadosPositions.positions.length - 1].lat,
    dadosPositions.positions[dadosPositions.positions.length - 1].lon,
  ];
  const lastPositionDate =
    dadosPositions.positions[dadosPositions.positions.length - 1].date;

  const stateInfo = equipmentState.find((obj) => obj.id === lastState);

  return (
    <>
      <EquipamentoContainer
        cardVirado={cardVirado}
        stateInfo={stateInfo}
        flip={flipBack}
      >
        <p>{dadosModelo.emoji}</p>
        <p>{name}</p>
        <p>{dadosModelo.name}</p>
        <p>
          Status: <span>{stateInfo.name}</span>
        </p>
        <p>
          atualizado em {lastStateDate.slice(8, 10)}/{lastStateDate.slice(5, 7)}
          /{lastStateDate.slice(0, 4)} às {lastStateDate.slice(11, 16)}
        </p>
        <MapContainer
          center={lastPosition}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={lastPosition}>
            <Popup>
              <PopupText>
                Coordenadas: {lastPosition[0]}, {lastPosition[1]}
                <br />
                atualizado em {lastPositionDate.slice(8, 10)}/
                {lastPositionDate.slice(5, 7)}/{lastPositionDate.slice(0, 4)} às{" "}
                {lastPositionDate.slice(11, 16)}
              </PopupText>
            </Popup>
          </Marker>
        </MapContainer>
        <MoreInfo
          onClick={() => {
            setFlipBack(true);
            setTimeout(() => setCardVirado(true), 600);
            setTimeout(() => setFlipBack(false), 1200);
          }}
        >
          {"<"} ACESSAR HISTÓRICO {">"}
        </MoreInfo>
      </EquipamentoContainer>
      <EquipamentoContainerVirado cardVirado={cardVirado} flip={flipFront}>
        <p>{dadosModelo.emoji}</p>
        <p>{name}</p>
        <p>{dadosModelo.name}</p>
        <p>Últimas atualizações:</p>
        <ul>
          {last10States.map((s) => (
            <li key={s.date}>
              {s.date.slice(8, 10)}/{s.date.slice(5, 7)}/{s.date.slice(0, 4)} às{" "}
              {s.date.slice(11, 16)}:{" "}
              <StateColor
                color={
                  equipmentState.find((obj) => obj.id === s.equipmentStateId)
                    .color
                }
              >
                {
                  equipmentState.find((obj) => obj.id === s.equipmentStateId)
                    .name
                }
              </StateColor>
            </li>
          ))}
        </ul>
        <GoBack
          onClick={() => {
            setFlipFront(true);
            setTimeout(() => setCardVirado(false), 600);
            setTimeout(() => setFlipFront(false), 1200);
          }}
        >
          {"<"} VOLTAR {">"}
        </GoBack>
      </EquipamentoContainerVirado>
    </>
  );
}

const EquipamentoContainer = styled.div`
  display: ${({ cardVirado }) => (cardVirado ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0px 20px;
  font-family: "Tilt Warp", cursive;
  background-color: #efefef;
  border-radius: 10px;
  height: 500px;
  width: 300px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  color: #003184;
  p:nth-child(1),
  p:nth-child(2) {
    font-size: 40px;
  }
  p:nth-child(4) {
    margin-top: 23px;
    font-size: 25px;
  }
  p:nth-child(5) {
    font-size: 15px;
    margin-bottom: 10px;
  }
  span {
    color: ${({ stateInfo }) => stateInfo.color};
  }
  animation: ${(props) => props.flip && FlipBack} 1.2s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
`;

const FlipBack = keyframes`
    0% {
      transform: translateZ(0) rotateY(0);
    }
    100% {
      transform: translateZ(-260px) rotateY(-180deg);
    }
`;

const FlipFront = keyframes`
    0% {
      transform: translateZ(0) rotateY(0);
    }
    100% {
      transform: translateZ(-260px) rotateY(-180deg);
    }
`;

const PopupText = styled.div`
  text-align: center;
`;

const MoreInfo = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 23px;
  cursor: pointer;
`;

const EquipamentoContainerVirado = styled.div`
  display: ${({ cardVirado }) => (cardVirado ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0px 20px;
  font-family: "Tilt Warp", cursive;
  background-color: #efefef;
  border-radius: 10px;
  height: 500px;
  width: 300px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  color: #003184;
  p:nth-child(1),
  p:nth-child(2) {
    font-size: 40px;
  }
  p:nth-child(4) {
    font-size: 23px;
    margin-top: 25px;
  }
  ul {
    margin-top: 15px;
  }
  li {
    margin-bottom: 10px;
    font-size: 16px;
  }
  position: relative;
  animation: ${(props) => props.flip && FlipFront} 1.2s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
`;

const GoBack = styled.p`
  font-size: 23px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
`;

const StateColor = styled.span`
  color: ${({ color }) => color};
`;
