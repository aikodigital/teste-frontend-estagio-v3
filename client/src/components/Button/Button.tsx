import React from 'react';

interface SubmitButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>Submit</button>
  );
};