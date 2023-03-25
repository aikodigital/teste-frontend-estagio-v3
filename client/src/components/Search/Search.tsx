import React, { useState } from "react";
import { SubmitButton } from "../Button/Button";
import { TextInput } from "../Input/Input";
import { Funnel } from "@phosphor-icons/react";

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
      <Funnel className="funnel" size={38} weight="fill" />
    </div>
  );
};
