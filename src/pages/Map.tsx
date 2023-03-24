import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { EquipmentModelRelation } from '../types';
import equipment from '../assets/data/equipment.json';
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import { query } from '../utils/query';
import { Fragment } from 'react';

function Map() {
  const equipments = query(
    query(equipment).relation(equipmentModel, 'id', 'equipmentModelId'),
  ).rename<EquipmentModelRelation>('relation', 'model');
  const equipmentsPositionHistory = query(equipments).relation(
    equipmentPositionHistory,
    'equipmentId',
    'id',
  );

  const firstPosition = query(
    equipmentsPositionHistory[0].relation.first().positions,
  )
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
          {equipmentsPositionHistory.map((equipment) => {
            const positionHistory = query(
              equipment.relation.first().positions,
            ).sort('date', 'desc');
            const lastPosition = positionHistory.first();
            return (
              <Fragment key={equipment.id}>
                <Marker
                  key={equipment.id}
                  position={[lastPosition.lat, lastPosition.lon]}
                >
                  <Popup>
                    <p className="font-bold">{equipment.name}</p>
                    <p className="font-bold opacity-70">
                      {equipment.model.first().name}
                    </p>
                    <button className="w-full rounded bg-blue-500 p-2 text-white">
                      Ver mais
                    </button>
                  </Popup>
                  <Tooltip>{equipment.name}</Tooltip>
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
