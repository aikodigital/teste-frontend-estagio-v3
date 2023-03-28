/* import {
  CheckFat,
  Engine,
  FastForward,
  HandPalm,
  MapPinLine,
  Pause,
  Wrench,
} from "@phosphor-icons/react"; */


import { CheckFat, MapPinLine, Pause, Wrench } from "@phosphor-icons/react";
import React from "react";
import { Popup } from "react-leaflet";
import { Equipament } from "../../class/Equipment";
import { InnerCard } from "../InnerCard/InnerCard";


interface PopUpProps {
    equipment: Equipament;
}

export const PopUpComponent: React.FC<PopUpProps> = ({equipment}) => {
  
  return (
    <Popup offset={[10, -35]}>
      <InnerCard equipment={equipment}/>
    </Popup>
  );
};
