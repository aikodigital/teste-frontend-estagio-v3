import { useState } from 'react';
import { getAllEquipment, search } from '../utils/api';
import FilterBar from '../components/FilterBar';
import MapMod from '../components/MapMod';
import TimeLine from '../components/TimeLine';

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [end, setEnd] = useState(3);
  const [start, setStart] = useState(0);
  const equipments = getAllEquipment(start);
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
      <FilterBar
        onSearch={setSearchQuery}
        onStateFilter={setStateFilter}
        onModelFilter={setModelFilter}
      />
      <div className="border-b-2 border-t-2 border-slate-600 bg-slate-500">
        <TimeLine
          end={end}
          start={start}
          onChange={({ end, start }) => {
            setEnd(end);
            setStart(start);
          }}
        />
        <div className="h-[calc(100vh-7.47rem)] w-screen">
          <MapMod equipments={equipmentsFilter} trace={end - start} />
        </div>
      </div>
    </>
  );
}

export default Map;
