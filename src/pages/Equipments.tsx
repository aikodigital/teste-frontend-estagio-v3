import Card from '../components/Card';
import {
  getAllEquipment,
  getIconByModelName,
  getStatesByEquipmentId,
  search,
} from '../utils/api';
import { ModalContext } from '../context/ModalContext';
import { useContext, useState } from 'react';
import FilterBar from '../components/FilterBar';

function Equipments() {
  const { openModal } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const equipments = getAllEquipment();
  const equipmentsFilter = equipments.filter((equipment) => {
    return (
      (search(equipment.name, searchQuery) ||
        search(equipment.model.name, searchQuery)) &&
      (stateFilter === 'all' || equipment.states[0].name === stateFilter) &&
      (modelFilter === 'all' || equipment.model.name === modelFilter)
    );
  });

  return (
    <div className="flex flex-wrap justify-center">
      <FilterBar
        onSearch={setSearchQuery}
        onStateFilter={setStateFilter}
        onModelFilter={setModelFilter}
      />
      {equipmentsFilter.map((equipment) => {
        const states = getStatesByEquipmentId(equipment.id);
        return (
          <Card key={equipment.id} onClick={() => openModal(equipment.id)}>
            <div className="h-full">
              <img
                src={getIconByModelName(equipment.model.name)}
                alt={equipment.model.name}
                className="h-full"
              />
            </div>
            <div className="h-full">
              <h2 className="text-xl">{equipment.name}</h2>
              <p className="opacity-70">{equipment.model.name}</p>
              <p className="flex items-center text-xs font-bold opacity-70">
                {states[0].name}{' '}
                <span
                  className="m-1 h-3 w-3 rounded-full"
                  style={{ backgroundColor: states[0].color }}
                />
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Equipments;
