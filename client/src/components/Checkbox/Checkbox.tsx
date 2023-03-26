import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';

type CheckBoxProps = {
  text: string;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ text }) => (
  <form>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
        <Checkbox.Indicator className="CheckboxIndicator">
        <Check size={10} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor="c1">
        {text}
      </label>
    </div>
  </form>
);


