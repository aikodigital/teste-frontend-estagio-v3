import styled from "styled-components";

import equipmentModel from "../data/equipmentModel.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Equipamento({ eqID, modelID, name }) {
  const dadosModelo = equipmentModel.find((obj) => obj.id === modelID);
  const dadosStates = equipmentStateHistory.find(
    (obj) => obj.equipmentId === eqID
  );
  const dadosPositions = equipmentPositionHistory.find(
    (obj) => obj.equipmentId === eqID
  );

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
    <EquipamentoContainer stateInfo={stateInfo}>
      <p>{dadosModelo.emoji}</p>
      <p>{name}</p>
      <p>{dadosModelo.name}</p>
      <p>
        Status: <span>{stateInfo.name}</span>
      </p>
      <p>
        atualizado em {lastStateDate.slice(8, 10)}/{lastStateDate.slice(5, 7)}/
        {lastStateDate.slice(0, 4)} às {lastStateDate.slice(11, 16)}
      </p>
      <MapContainer
        center={lastPosition}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "220px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={lastPosition}>
          <Popup>
            <span>
              atualizado em {lastPositionDate.slice(8, 10)}/
              {lastPositionDate.slice(5, 7)}/{lastPositionDate.slice(0, 4)} às{" "}
              {lastPositionDate.slice(11, 16)}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </EquipamentoContainer>
  );
}

const EquipamentoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Tilt Warp", cursive;
  background-color: #efefef;
  border-radius: 10px;
  height: 500px;
  width: 300px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  color: #003184;
  p {
    margin-bottom: 10px;
  }
  p:nth-child(1),
  p:nth-child(2) {
    font-size: 40px;
  }
  p:nth-child(4) {
    margin-top: 20px;
    font-size: 22px;
  }
  p:nth-child(5) {
    font-size: 15px;
    margin-top: -5px;
  }
  span {
    color: ${({ stateInfo }) => stateInfo.color};
  }
  cursor: pointer;
`;
