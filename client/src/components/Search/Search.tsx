import React, { useState } from "react";
import { SubmitButton } from "../Button/Button";
import { TextInput } from "../Input/Input";

export const Search = () => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(text);
  };

  return (
    <div className="search">
      <TextInput
        placeholder="Enter some text"
        value={text}
        onChange={handleTextChange}
      />
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
};
