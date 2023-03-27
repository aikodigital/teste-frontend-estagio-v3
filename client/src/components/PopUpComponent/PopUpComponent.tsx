/* import {
  CheckFat,
  Engine,
  FastForward,
  HandPalm,
  MapPinLine,
  Pause,
  Wrench,
} from "@phosphor-icons/react"; */


import { CheckFat, MapPinLine } from "@phosphor-icons/react";
import React from "react";
import { Popup } from "react-leaflet";
import { EquipamentType } from "../../class/EquipmentType";
import { State } from "../../class/State";

interface PopUpProps {
    model: string;
    name: string;
    date: string;
    position: number[];
    state: string;
}

export const PopUpComponent: React.FC<PopUpProps> = ({model,name,date,position,state}) => {
  const tempDate = new Date(date);
  const formattedDate = tempDate.toLocaleString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Popup offset={[10, -35]}>
      <div>
        <div className="header">
          <div className="model">
            <p>{EquipamentType.getNameFromId(model)}</p>
            <h2>{name}</h2>
          </div>
          <CheckFat size={32} style={{ color: "#2ecc71" }} weight="fill" />
        </div>

        <div className="body">
          <p className="state">{State.getNameStateId(state)}</p>
          <p className="thisDate">{formattedDate}</p>
        </div>

        <div className="position">
          <MapPinLine size={20} />
          <p>{position}</p>
        </div>
      </div>
    </Popup>
  );
};

{
  /* <Wrench size={32} style={{color: "#e74c3c"}}  weight="fill" />
          <Engine size={32}   style={{color: "#e74c3c"}}   weight="fill" />

          <CheckFat size={32} style={{color: "#2ecc71"}} weight="fill" />
          <FastForward size={32}  style={{color: "#2ecc71"}} weight="fill" />

          <HandPalm size={32} style={{color: "#f1c40f"}}   weight="fill" />
          <Pause size={32} style={{color: "#f1c40f"}}   weight="fill" /> */
}
