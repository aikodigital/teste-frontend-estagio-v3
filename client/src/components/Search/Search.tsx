import React, { useState } from "react";
import { TextInput } from "../Input/Input";
import { PopoverComp } from "../PopOver/PopOver";

export const Search = () => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="search">
      <TextInput
        placeholder="Search..."
        value={text}
        onChange={handleTextChange}
      />
      <PopoverComp />
    </div>
  );
};
