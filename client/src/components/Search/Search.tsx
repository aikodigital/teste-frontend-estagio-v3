import React, { useState } from "react";
import { Select } from "../Select/Select";
import { PopoverComp } from "../PopOver/PopOver";


interface SearchProps {
  options: string[];
}

export const Search: React.FC<SearchProps> = ({ options }) => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="search">
      <Select
        placeholder="Search..."
        options={options}
        //@ts-ignore
        onChange={handleTextChange}
      />
      <PopoverComp />
    </div>
  );
};
