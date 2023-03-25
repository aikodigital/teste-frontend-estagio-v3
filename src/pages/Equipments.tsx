import Card from '../components/Card';
import { getAllEquipment, getStatesByEquipmentId, search } from '../utils/api';
import { ModalContext } from '../context/ModalContext';
import { useContext, useState } from 'react';
import FilterBar from '../components/FilterBar';

function Equipments() {
  const { openModal } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState('all');
  const equipments = getAllEquipment();
  const equipmentsFilter = equipments.filter((equipment) => {
    return (
      (search(equipment.name, searchQuery) ||
        search(equipment.model.name, searchQuery)) &&
      (state === 'all' || equipment.states[0].name === state)
    );
  });

  return (
    <div className="flex flex-wrap justify-center">
      <FilterBar onSearch={setSearchQuery} onFilter={setState} />
      {equipmentsFilter.map((equipment) => {
        const states = getStatesByEquipmentId(equipment.id);
        return (
          <Card key={equipment.id} onClick={() => openModal(equipment.id)}>
            <p className="opacity-70">{equipment.id}</p>
            <h2 className="text-xl">{equipment.name}</h2>
            <p className="opacity-70">{equipment.model.name}</p>
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
