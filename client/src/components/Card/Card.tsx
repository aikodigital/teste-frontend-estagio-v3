import React from "react";
import { Equipament } from "../../class/Equipment";
import { Accordeon } from "../Accordeon/Accordeon";
import { InnerCard } from "../InnerCard/InnerCard";

interface CardProps {
  equipment: Equipament;
}

export const Card: React.FC<CardProps> = ({ equipment }) => {
  return (
    <div className="card">
      <div className="card-header">
        <InnerCard equipment={equipment} />
      </div>

      <div className="card-content">
        <Accordeon equipment={equipment} />
      </div>
    </div>
  );
};
