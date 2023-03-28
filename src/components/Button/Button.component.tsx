import React from 'react';
import './Button.styles.css';

interface Props {
  label: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ label, onClick }) => (
  <button className='button' onClick={onClick}>
    {label}
  </button>
);

export default Button;
