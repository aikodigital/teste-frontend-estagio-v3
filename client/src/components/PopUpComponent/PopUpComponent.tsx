
import React from "react";
import { Popup } from "react-leaflet";
import { Equipament } from "../../class/Equipment";
import { AlertDialog } from "../Alert/Alert";
import { InnerCard } from "../InnerCard/InnerCard";

interface PopUpProps {
  equipment: Equipament;
}

export const PopUpComponent: React.FC<PopUpProps> = ({ equipment }) => {
  return (
    <Popup offset={[10, -35]}>
      <AlertDialog equipment={equipment} />
      <InnerCard equipment={equipment} />
    </Popup>
  );
};
