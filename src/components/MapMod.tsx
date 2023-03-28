import { Fragment, useContext } from 'react';
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
import { ModalContext } from '../context/ModalContext';
import {
  Equipment,
  getAllEquipment,
  getIconByModelName,
  getStateIcon,
} from '../utils/api';

interface Props {
  trace?: number;
  equipments: Equipment[];
  modal?: boolean;
}

function MapMod({ trace = 1, equipments, modal }: Props) {
  const lastPosition = getAllEquipment()[0].positions[0];
  const { openModal } = useContext(ModalContext);
  return (
    <MapContainer
      center={[lastPosition.lat, lastPosition.lon]}
      zoom={10}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipments.map((equipment) => {
        const stateHistory = equipment.states;
        const positionHistory = equipment.positions;
        const lastState = stateHistory[0];
        const lastPosition = positionHistory[0];
        const polyline = positionHistory
          .map((position) => [position.lat, position.lon])
          .slice(0, trace) as [number, number][];
        const markerTrace = positionHistory
          .map((position, i) => ({
            ...position,
            state: stateHistory[i],
          }))
          .slice(0, trace);
        return (
          <Fragment key={equipment.id}>
            <Polyline
              pathOptions={{ color: '#1c1c1c32' }}
              positions={polyline}
            />
            {markerTrace.map((item, index) => (
              <Marker
                key={index}
                position={[item.lat, item.lon]}
                icon={
                  new L.Icon({
                    iconUrl: getStateIcon(item.state.id),
                    iconSize: [10, 10],
                  })
                }
              >
                <Tooltip>
                  <div className="flex items-center">
                    {equipment.name} - {item.state.name}
                  </div>
                </Tooltip>
              </Marker>
            ))}
            <Marker
              key={equipment.id}
              position={[lastPosition.lat, lastPosition.lon]}
              icon={
                new L.Icon({
                  iconUrl: getIconByModelName(equipment.model?.name),
                  iconSize: [50, 50],
                })
              }
            >
              {!modal && (
                <>
                  <Popup>
                    <p className="font-bold">
                      {equipment.name} - {lastState.name}
                    </p>
                    <p className="font-bold opacity-70">
                      {equipment.model?.name}
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
                      {equipment.name} - {lastState.name}
                      <div
                        className="m-2 h-3 w-3 rounded-full"
                        style={{ backgroundColor: lastState.color }}
                      />
                    </div>
                  </Tooltip>
                </>
              )}
            </Marker>
          </Fragment>
        );
      })}
    </MapContainer>
  );
}

export default MapMod;
