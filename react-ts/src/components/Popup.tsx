import React, { useState, useEffect } from "react";

import States from "../../../data/equipmentState.json";
import Modelo from "../../../data/equipmentModel.json";
import StatesHistory from "../../../data/equipmentStateHistory.json";
import PositionHistory from "../../../data/equipmentPositionHistory.json";

let statesArr: string[] = [];

const idMap = {
  "a7c53eb1-4f5e-4eba-9764-ad205d0891f9": 0,
  "1c7e9615-cc1c-4d72-8496-190fe5791c8b": 1,
  "2b5796cb-21c1-480e-8886-4498ea593a65": 2,
  "1d222cdc-01dd-4caa-8934-5351d3995cfb": 3,
  "491b983b-950c-4a88-942d-487e99b92540": 4,
  "39317fcb-79e7-4e7e-83dc-723a9b63633c": 5,
  "c79ef1de-92f3-4edd-bd55-553056640449": 6,
  "b7aaba00-13f7-44a0-8bf1-bc163afcf9d8": 7,
  "fe2a2e11-bfa6-46b6-990b-fd8175946b7e": 8,
};

function traslateState(stateID: string) {
  const stateOnTimeFrame = States.find((status) => status.id === stateID);
  if (stateOnTimeFrame?.name) {
    statesArr.push(stateOnTimeFrame.name);
    return stateOnTimeFrame.name;
  }
  return "Estado não encontrado";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear().toString()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

import MapDisplay from "./MapDisplay";

export default function Popup(props: any) {
  const [positions, setPositions] = useState<
    { lat: number | null; lon: number | null }[]
  >([]);

  const equipmentIndex = idMap[props.equipment.id as keyof typeof idMap];
  const estadoAtual = States.find(
    (status) =>
      status.id ===
      StatesHistory[equipmentIndex].states.slice(-1)[0].equipmentStateId
  );

  useEffect(() => {
    const equipmentID = props.equipment.id;

    const posicaoData = PositionHistory.find(
      (data) => data.equipmentId === equipmentID
    );

    if (posicaoData) {
      const positions = posicaoData.positions.map(({ lat, lon }) => ({
        lat: lat || null,
        lon: lon || null,
      }));
      setPositions(positions);
    }
  }, [props.equipment]);
  if (!props.trigger) return null;
  return (
    <div className="z-40 w-full h-screen fixed top-0 left-0 grid place-items-center bg-transparent backdrop-blur-sm">
      <div className="z-50 bg- w-[90%] h-[90vh] rounded-xl bg-slate-800 flex flex-col snap-y overflow-scroll overflow-x-hidden">
        <div className="flex flex-row-reverse p-5">
          <button onClick={() => props.setTrigger(false)}>
            <svg
              className="fill-white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
            </svg>
          </button>
        </div>
        <div className="w-full text-center grow">
          <MapDisplay positions={positions} estadosArr={statesArr} />
        </div>
        <div className="w-full grid place-items-center text-xl pb-2">
          Estado Atual: {estadoAtual?.name}
        </div>
        <div className="w-full grid place-items-center text-xl">
          Historico de Estados
          <ul className="border-2 rounded-xl px-20 py-2 border-slate-600 list-decimal mb-5">
            {StatesHistory[equipmentIndex].states.map((estado) => (
              <li className="text-base lg:text-lg">
                <div className="">
                  <p>
                    {formatDate(estado.date)} -{" "}
                    {traslateState(estado.equipmentStateId)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
