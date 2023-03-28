import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPosition.styles.css';
import getIconImage from '../../utils/getIconImage';
import useEquipment from '../../hooks/useEquipment';
import EquipmentInfo from '../../components/EquipmentInfo/EquipmentInfo.component';
import Filter from '../../components/Filter/Filter.component';
import { EquipmentsWithPositions } from '../../models/Equipment.model';

const MapPosition: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredEquipments, setFilteredEquipments] = useState<EquipmentsWithPositions[]>([]);

  const { equipments } = useEquipment();

  useEffect(() => {
    if (equipments) {
      setFilteredEquipments(equipments);
      setIsLoading(false);
    }
  }, [equipments]);

  const renderMarkers = () => {
    if (filteredEquipments) {
      return (
        <>
          {filteredEquipments.map((equipment: EquipmentsWithPositions, index: number) => {
            return (
              <Marker
                key={`${equipment.equipmentModelId}-${index}`}
                position={[
                  equipment.positions[equipment.positions.length - 1].lat,
                  equipment.positions[equipment.positions.length - 1].lon,
                ]}
                icon={
                  new Icon({
                    iconUrl: getIconImage(equipment.name),
                    iconSize: [48, 48],
                    className: 'iconContainer',
                  })
                }
              >
                <EquipmentInfo equipmentDetails={equipment} />
              </Marker>
            );
          })}
        </>
      );
    }
  };

  if (isLoading) return <></>;

  return (
    <>
      <Filter equipmentsList={equipments} setEquipmentsList={setFilteredEquipments} />
      <div id='mapContainer'>
        <MapContainer center={[-19.195811, -45.825157]} zoom={10} scrollWheelZoom zoomControl={false}>
          <ZoomControl position="bottomleft" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {renderMarkers()};
        </MapContainer>
      </div>
    </>
  );
};

export default MapPosition;
