import React from 'react';
import { Popup } from 'react-leaflet';
import useEquipment from '../../hooks/useEquipment';
import useEquipmentStates from '../../hooks/useEquipmentStates';
import Button from '../Button/Button.component';
import Status from '../Status/Status.component';
import './EquipmentInfo.styles.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalActions';
import { setActiveEquipment } from '../../store/equipment/equipmentActions';
import { EquipmentStatusDescription, EquipmentsWithPositions } from '../../models/Equipment.model';

interface Props {
  equipmentDetails: EquipmentsWithPositions;
}

const EquipmentInfo: React.FC<Props> = ({ equipmentDetails }) => {
  const dispatch = useDispatch();

  const { getLastEquipmentStatusById } = useEquipment();
  const { getStatusById } = useEquipmentStates();

  const statusDescription = getStatusById(
    getLastEquipmentStatusById(equipmentDetails.id) || '',
  ) as EquipmentStatusDescription;

  const handleClick = () => {
    dispatch(setActiveEquipment(equipmentDetails));
    dispatch(openModal());
  };

  return (
    <Popup>
      <h2 className='equipmentName'>{equipmentDetails.name}</h2>
      <div className='equipmentId'>
        <h4>Equipment ID</h4>
        <p>{equipmentDetails.id}</p>
      </div>
      <Status statusObject={statusDescription} />
      <div className='lastPosition'>
        <h4>Última posição</h4>
        <p>{`Lat: ${equipmentDetails.positions[equipmentDetails.positions.length - 1].lat}`}</p>
        <p>{`Lon: ${equipmentDetails.positions[equipmentDetails.positions.length - 1].lon}`}</p>
      </div>
      <Button label='Mais informações' onClick={() => handleClick()} />
    </Popup>
  );
};

export default EquipmentInfo;
