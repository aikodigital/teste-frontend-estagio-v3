import React from 'react';
import './Legend.css';

const Legend2 = (props) => {
    return (
      <div className="legend2">
        <div className="legend-item">
          < props.iconeb className='legend-icon2'/>
          <span>{props.nameb}</span> 
        </div>  
        <div className="legend-item">
          <div className='legend-color2' style={{ background: "linear-gradient(to right, black, gray, #f0f0f0)" }}></div>
        
          <span>Quanto mais escuro mais recente</span>
        </div>
      </div>
    );
};
export default Legend2;