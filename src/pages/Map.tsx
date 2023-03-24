import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { EquipmentModelRelation } from '../types';
import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import equipmentState from '../assets/data/equipmentState.json';
import { query } from '../utils/query';
import { Fragment } from 'react';

function Map() {
  const equipments = query(
    query(equipment).relation(equipmentModel, 'id', 'equipmentModelId'),
  ).rename<EquipmentModelRelation>('relation', 'model');
  const positionHistory = query(equipments).relation(
    equipmentPositionHistory,
    'equipmentId',
    'id',
  );

  const firstPosition = query(positionHistory[0].relation.first().positions)
    .sort('date', 'desc')
    .first();

  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] w-screen">
        <MapContainer
          center={[firstPosition.lat, firstPosition.lon]}
          zoom={10}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positionHistory.map((equipment) => {
            const firstState = query(
              query(equipmentStateHistory)
                .where(({ equipmentId }) => equipment.id === equipmentId)
                .first().states,
            )
              .sort('date', 'desc')
              .relation(equipmentState, 'id', 'equipmentStateId')[0]
              .relation.first();
            const positionHistory = query(
              equipment.relation.first().positions,
            ).sort('date', 'desc');
            const lastPosition = positionHistory.first();
            const polyline = positionHistory
              .get()
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
                >
                  <Popup>
                    <p className="font-bold">
                      {equipment.name} - {firstState.name}
                    </p>
                    <p className="font-bold opacity-70">
                      {equipment.model.first().name}
                    </p>
                    <button className="w-full rounded bg-blue-500 p-2 text-white">
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
