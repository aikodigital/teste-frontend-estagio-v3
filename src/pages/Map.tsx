import { useState } from 'react';
import { getAllEquipment, search } from '../utils/api';
import FilterBar from '../components/FilterBar';
import MapMod from '../components/MapMod';

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const equipments = getAllEquipment();
  const equipmentsFilter = equipments.filter((equipment) => {
    return (
      (search(equipment.name, searchQuery) ||
        search(equipment?.model?.name, searchQuery)) &&
      (stateFilter === 'all' || equipment.states[0].name === stateFilter) &&
      (modelFilter === 'all' || equipment?.model?.name === modelFilter)
    );
  });
  return (
    <>
      <div className="h-[calc(100vh-4.72rem)] w-screen">
        <FilterBar
          onSearch={setSearchQuery}
          onStateFilter={setStateFilter}
          onModelFilter={setModelFilter}
        />
        <MapMod equipments={equipmentsFilter} trace={3} />
      </div>
    </>
  );
}

export default Map;
