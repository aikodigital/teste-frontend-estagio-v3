import { Equipament } from "../../class/Equipment";
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Select } from "../Select/Select";

import { useState } from "react";
import { StateEnum } from "../../class/State";
import { TypeEnum } from "../../class/EquipmentType";

interface SidebarProps {
  equipments: Equipament[];
}

/* export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipament | null>(null);

  const NamesArray = equipments.map((equipment) => equipment.equipName);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTypeId = event.target.value;
    const selectedEquip = equipments.find((equip) => equip.typeId === selectedTypeId) ?? null;
    setSelectedEquipment(selectedEquip);
  };

  let componentsArray = null;
  if (selectedEquipment !== null) {
    componentsArray = [<Card key={selectedEquipment.equipId + selectedEquipment.typeId} equipment={selectedEquipment} />];
  } else {
    componentsArray = equipments.map((equipment) => (
      <Card key={equipment.equipId + equipment.typeId} equipment={equipment} />
    ));
  }

  const statesArray = [
    StateEnum.Working,
    StateEnum.Idle,
    StateEnum.Maintenance,
  ];
  
  const modelsArray = [
    TypeEnum.CargoTruck,
    TypeEnum.Harvester,
    TypeEnum.Claw,
  ];
 
  

  return (
    <div className="sidebar">
      <div className="search">
        <Select placeholder="Select equipment" options={NamesArray} onChange={handleSelectChange} />
        <Select  placeholder={"Model:"}  options={modelsArray} onChange={handleSelectChange} selectType={"model"}  />
        <Select placeholder={"State:"}  options={statesArray} onChange={handleSelectChange} selectType={"state"}   />
      </div>
      <ScrollAreaComp components={componentsArray} isChild={false} />
    </div>
  );
}; */

export const Sidebar: React.FC<SidebarProps> = ({ equipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipament | null>(
    null
  );
  const [componentsArray, setComponentsArray] = useState<JSX.Element[] | null>(
    null
  );

  const namesArray = equipments.map((equipment) => equipment.equipName);

  const handleTypeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTypeId = event.target.value;
    const selectedEquips = equipments.filter(
      (equip) => equip.typeId === selectedTypeId
    );
    if (selectedEquips.length > 0) {
      setSelectedEquipment(null);
      const equipCards = selectedEquips.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    } else {
      setSelectedEquipment(null);
      const equipCards = equipments.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEquipName = event.target.value;
    const selectedEquip =
      equipments.find((equip) => equip.equipName === selectedEquipName) ?? null;
    setSelectedEquipment(selectedEquip);
    if (selectedEquip !== null) {
      setComponentsArray([
        <Card
          key={selectedEquip.equipId + selectedEquip.typeId}
          equipment={selectedEquip}
        />,
      ]);
    } else {
      const equipCards = equipments.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    }
  };

  if (selectedEquipment === null && componentsArray === null) {
    const equipCards = equipments.map((equipment) => (
      <Card key={equipment.equipId + equipment.typeId} equipment={equipment} />
    ));
    setComponentsArray(equipCards);
  }

  const modelsArray = [TypeEnum.CargoTruck, TypeEnum.Harvester, TypeEnum.Claw];

  return (
    <div className="sidebar">
      <div className="search">
        <Select
          placeholder="Select equipment"
          options={namesArray}
          onChange={handleSelectChange}
        />
        <Select
          placeholder={"Model:"}
          options={modelsArray}
          onChange={handleTypeSelectChange}
          selectType={"model"}
        />
      </div>
      <ScrollAreaComp components={componentsArray || []} isChild={false} />
    </div>
  );
};