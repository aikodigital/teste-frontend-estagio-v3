import React from 'react';
import { EquipmentStatusDescription } from '../../models/Equipment.model';
import './Status.styles.css';

interface Props {
  statusObject: EquipmentStatusDescription;
}

const Status: React.FC<Props> = ({ statusObject }) => (
  <div className='statusContainerDescription' style={{ backgroundColor: statusObject.color }}>
    <p>{statusObject.name}</p>
  </div>
);

export default Status;
