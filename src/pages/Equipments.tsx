import { query } from '../utils/query';
import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import Card from '../components/Card';
import { getStatesByEquipmentId } from '../utils/api';
import { ModalContext } from '../context/ModalContext';
import { useContext } from 'react';

function Equipments() {
  const { openModal } = useContext(ModalContext);
  const equipments = query(equipment).get({
    relation: {
      data: equipmentModel,
      key: 'id',
      relation: 'equipmentModelId',
    },
  });
  return (
    <div className="flex flex-wrap justify-center">
      {equipments.map((equipment) => {
        const states = getStatesByEquipmentId(equipment.id);
        return (
          <Card key={equipment.id} onClick={() => openModal(equipment.id)}>
            <p className="opacity-70">{equipment.id}</p>
            <h2 className="text-xl">{equipment.name}</h2>
            <p className="opacity-70">{equipment.relation.first()?.name}</p>
            <p className="flex items-center text-xs font-bold opacity-70">
              {states[0].name}{' '}
              <div
                className="m-1 h-3 w-3 rounded-full"
                style={{ backgroundColor: states[0].color }}
              />
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export default Equipments;
