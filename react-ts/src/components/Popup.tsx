import React, { useState, useEffect } from "react";

import Estados from "../../../data/equipmentState.json";
import Modelo from "../../../data/equipmentModel.json";
import HistEstados from "../../../data/equipmentStateHistory.json";
import HistPosicao from "../../../data/equipmentPositionHistory.json";

import MapDisplay from "./MapDisplay";

export default function Popup(props: any) {
  const [posicoes, setPosicoes] = useState<
    { lat: number | null; lon: number | null }[]
  >([]);

  useEffect(() => {
    const equipamentoId = props.equipamento.id;

    const posicaoData = HistPosicao.find(
      (data) => data.equipmentId === equipamentoId
    );
    console.log(posicaoData?.positions[0]);

    if (posicaoData) {
      const posicoes = posicaoData.positions.map(({ lat, lon }) => ({
        lat: lat || null,
        lon: lon || null,
      }));
      setPosicoes(posicoes);
    }
  }, [props.equipamento]);
  if (!props.trigger) return null;
  return (
    <div className="z-40 w-full h-screen fixed top-0 left-0 grid place-items-center bg-transparent backdrop-blur-sm">
      <div className="z-50 bg- w-[90%] h-[90vh] rounded-xl bg-slate-800 flex flex-col">
        <button onClick={() => props.setTrigger(false)}>
          <div className="flex flex-row-reverse p-5">
            <svg
              className="fill-white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
            </svg>
          </div>
        </button>
        <div className="w-full text-center grow">
          <MapDisplay posicoes={posicoes} />
        </div>
      </div>
    </div>
  );
}
