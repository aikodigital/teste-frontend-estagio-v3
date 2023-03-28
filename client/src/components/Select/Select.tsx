import React from "react";
import { EquipamentType } from "../../class/EquipmentType";
import { State } from "../../class/State";
interface SelectProps {
  placeholder: string;
  options: string[];
  selectType?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  options,
  selectType,
  onChange,
}) => {
  switch (selectType) {
    case "model":
      return (
        <select onChange={onChange} className="icon">
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {EquipamentType.getNameFromId(option)}
            </option>
          ))}
        </select>
      );
    case "state":
      return (
        <select onChange={onChange} className="icon">
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {State.getNameStateId(option)}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <select onChange={onChange}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
  }
}  