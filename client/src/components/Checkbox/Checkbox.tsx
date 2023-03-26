import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';

type CheckBoxProps = {
  text: string;
  isChecked: boolean;
  onClick: (isChecked: boolean) => void; // add onClick prop
};

export const CheckBox: React.FC<CheckBoxProps> = ({ text, isChecked, onClick }) => {
  const handleCheckboxClick = () => {
    onClick(!isChecked); // toggle the isChecked value and pass it to the onClick callback
  };

  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root className="CheckboxRoot" id={text} checked={isChecked} onClick={handleCheckboxClick}>
          <Checkbox.Indicator className="CheckboxIndicator">
            <Check size={10} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="Label" htmlFor={text}>
          {text}
        </label>
      </div>
    </form>
  );
};