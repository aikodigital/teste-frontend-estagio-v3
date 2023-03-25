import React from 'react';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input type='text' placeholder={placeholder} value={value} onChange={onChange} />
  );
};