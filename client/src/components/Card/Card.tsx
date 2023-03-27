import { MapPinLine } from '@phosphor-icons/react';
import React from 'react'
import { EquipamentType } from '../../class/EquipmentType';
import { State } from '../../class/State';
import { Accordeon } from '../Accordeon/Accordeon'



interface CardProps {
  model: string;
  name: string;
  date: string;
  position: number[];
  state: string;
}


export const Card: React.FC<CardProps> = ({model,name,date,position,state}) => {

  const tempDate = new Date(date);
  const formattedDate = tempDate.toLocaleString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  
  return (
    <div className='card'>
     <div>
        <div className="header">
          <div className="model">
            <p>{EquipamentType.getNameFromId(model)}</p>
            <h2>{name}</h2>
          </div>

         
        </div>

        <div className="body">
          <p className="state">{State.getNameStateId(state)}</p>
          <p className="thisDate">{formattedDate}</p>
        </div>

        <div className="position">
          <MapPinLine size={20} weight="duotone" />
          <p>{position}</p>
        </div>
      </div>
        
        <Accordeon />
      </div>
    
  )
}