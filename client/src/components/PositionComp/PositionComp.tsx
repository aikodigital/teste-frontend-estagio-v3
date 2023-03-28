import React from 'react'
import { setStateIcon } from '../../utils/setStateIcon';



interface PositionProps {
  position: string[];
}

export const PositionComp : React.FC<PositionProps> = ({ position }) => {

  const tempDate = new Date(position[0]);
  const formattedDate = tempDate.toLocaleString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  
  return (
    <div className='positioncomp'>
      <div className='state' >
        {setStateIcon(position[2], true)}
        <p>{position[1]}</p>
      </div>
      <p className='date'>{formattedDate}</p>
    </div>
  )
}
