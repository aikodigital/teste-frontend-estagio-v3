import React from 'react';
import { FaTruck } from 'react-icons/fa';
import './Legend.css';
import { TbBackhoe } from 'react-icons/tb';
import { GiCircularSawblade } from 'react-icons/gi';

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        < FaTruck className='legend-icon'/>
        <span>Caminhão de carga</span> 
      </div>  
      <div className="legend-item">
        < TbBackhoe className='legend-icon' />
        <span>Garra traçadora</span>
      </div>
      <div className="legend-item">
        < GiCircularSawblade className='legend-icon'/>
        <span>Harvester</span>
      </div>
      <div className="legend-item">
        <span className='legend-color' style={{ backgroundColor: "#2ecc71" }}></span>
        <span>Operando</span>
      </div>
      <div className="legend-item">
        <span className='legend-color' style={{ backgroundColor: "#f1c40f" }}></span>
        <span>Parado</span>
      </div>
      <div className="legend-item">
        <span className='legend-color' style={{ backgroundColor: "#e74c3c" }}></span>
        <span>Manutenção</span>
      </div>
    </div>
  );
};

export default Legend;