import React from "react";
import ListItem from "./ListItem";

import Equipamentos from "../../../data/equipment.json";

export default function List() {
  return (
    <div className="w-screen lg:w-full flex flex-col justify-start items-center py-5 max-h-screen gap-5">
      <h1 className="text-5xl uppercase text-center">Lista de Equipamentos</h1>
      <div className="grow w-4/5 rounded-xl flex flex-col justify-start items-center gap-5 pt-2 overflow-y-scroll max-h-screen bg-[#0d131f]">
        {Equipamentos.map((equipamento, index) => (
          <ListItem key={index} equipamento={equipamento} />
        ))}
      </div>
    </div>
  );
}
