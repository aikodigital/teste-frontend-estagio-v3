import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreModel } from '../../models/Store.model';
import { clearEquipment } from '../../store/equipment/equipmentActions';
import { closeModal } from '../../store/modal/modalActions';
import EquipmentStatusHistory from '../EquipmentStatusHistory/EquipmentStatusHistory.component';
import X from '../icons/X.component';
import './ModalEquipmentsDetails.styles.css';

const ModalEquipmentsDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state: StoreModel) => state.modal);
  const { equipmentInfo } = useSelector((state: StoreModel) => state.equipment);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(clearEquipment());
  };

  if (!isModalVisible) {
    return <></>;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='closeModalContainer'>
          <X onClick={() => handleClose()} />
        </div>
        <h2>{equipmentInfo.name}</h2>
        <hr />
        <h3>Histórico de Estados</h3>
        <EquipmentStatusHistory equipmentId={equipmentInfo.equipmentId} />
      </div>
    </div>
  );
};

export default ModalEquipmentsDetails;
