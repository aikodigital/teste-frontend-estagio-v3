import { CheckFat, MapPinLine, Pause, Wrench } from "@phosphor-icons/react";
import React from "react";
import { Equipament } from "../../class/Equipment";
import { EquipamentType } from "../../class/EquipmentType";
import { State, StateEnum } from "../../class/State";
import { setStateIcon } from "../../utils/setStateIcon";

interface InnerProps {
  equipment: Equipament;
}

export const InnerCard: React.FC<InnerProps> = ({ equipment }) => {
  const state = equipment.getMostRecentState();
  const position = equipment.getMostRecentPosition();

  if (!position) {
    return null;
  }

  const tempDate = new Date(equipment.getMostRecentDate());
  const formattedDate = tempDate.toLocaleString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="innerCard">
      <div className="header">
        <div className="model">
          <p>{EquipamentType.getNameFromId(equipment.typeId)}</p>
          <h2>{equipment.equipName}</h2>
        </div>

        {setStateIcon(state[2], false)}
      </div>

      <div className="body">
        <p className="state">{State.getNameStateId(state[2])}</p>
        <p className="thisDate">{formattedDate}</p>
      </div>

      <div className="position">
        <MapPinLine size={20} weight="duotone" />
        <p>{position}</p>
      </div>
    </div>
  );
};
