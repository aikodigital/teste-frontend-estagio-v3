import * as React from 'react';

interface Props {
  onClick: () => void;
}

const X = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default X;
