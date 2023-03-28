import React from 'react';
import useEquipment from '../../hooks/useEquipment';
import useEquipmentStates from '../../hooks/useEquipmentStates';
import { EquipmentStatus, EquipmentStatusDescription } from '../../models/Equipment.model';
import convertIsoDateToDateTime from '../../utils/convertIsoDateToDateTime';
import Status from '../Status/Status.component';
import './EquipmentStatusHistory.styles.css';

interface Props {
  equipmentId: string;
}

const EquipmentStatusHistory: React.FC<Props> = ({ equipmentId }) => {
  const { getEquipmentStatusHistoryById } = useEquipment();
  const { getStatusById } = useEquipmentStates();

  const states: EquipmentStatus[] | undefined = getEquipmentStatusHistoryById(equipmentId);

  const renderLine = (element: EquipmentStatus, index: number) => (
    <tr key={`${equipmentId}-${index}-${element.date}`}>
      <td>{equipmentId}</td>
      <td>{convertIsoDateToDateTime(element.date)}</td>
      <td>
        <Status
          statusObject={getStatusById(element.equipmentStateId) as EquipmentStatusDescription}
        />
      </td>
    </tr>
  );

  const renderTableBody = () => (
    <tbody>
      {states
        ?.reverse()
        .map((equipmentState: EquipmentStatus, index: number) => renderLine(equipmentState, index))}
    </tbody>
  );

  const renderEmptyList = () => (
    <div className='emptyContainer'>
      <p>Nenhum registro encontrado!</p>
    </div>
  );

  return (
    <div className='tableContainer'>
      <table className='styledTable'>
        <thead>
          <tr>
            <th className='equipment'>ID do Equipamento</th>
            <th className='date'>Data</th>
            <th className='state'>Estado</th>
          </tr>
        </thead>
        {states && states.length ? renderTableBody() : renderEmptyList()}
      </table>
    </div>
  );
};

export default EquipmentStatusHistory;
