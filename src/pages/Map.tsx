import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Fragment, useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { getAllEquipment, getIconByModelName, search } from '../utils/api';
import FilterBar from '../components/FilterBar';

function Map() {
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
  const lastPosition = equipments[0].positions[0];
  return (
    <>
      <div className="h-[calc(100vh-8rem)] w-screen">
        <FilterBar
          onSearch={setSearchQuery}
          onStateFilter={setStateFilter}
          onModelFilter={setModelFilter}
        />
        <MapContainer
          center={[lastPosition.lat, lastPosition.lon]}
          zoom={10}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {equipmentsFilter.map((equipment) => {
            const firstState = equipment.states[0];
            const positionHistory = equipment.positions;
            const lastPosition = positionHistory[0];
            const polyline = positionHistory
              .map((position) => [position.lat, position.lon])
              .splice(0, 3) as [number, number][];
            return (
              <Fragment key={equipment.id}>
                <Polyline
                  pathOptions={{ color: '#1c1c1c32' }}
                  positions={polyline}
                />
                <Marker
                  key={equipment.id}
                  position={[lastPosition.lat, lastPosition.lon]}
                  icon={
                    new L.Icon({
                      iconUrl: getIconByModelName(equipment.model.name),
                      iconSize: [50, 50],
                    })
                  }
                >
                  <Popup>
                    <p className="font-bold">
                      {equipment.name} - {firstState.name}
                    </p>
                    <p className="font-bold opacity-70">
                      {equipment.model.name}
                    </p>
                    <button
                      className="w-full rounded bg-blue-500 p-2 text-white"
                      onClick={() => openModal(equipment.id)}
                    >
                      Ver mais
                    </button>
                  </Popup>
                  <Tooltip>
                    <div className="flex items-center">
                      {equipment.name} - {firstState.name}
                      <div
                        className="m-2 h-3 w-3 rounded-full"
                        style={{ backgroundColor: firstState.color }}
                      />
                    </div>
                  </Tooltip>
                </Marker>
              </Fragment>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
