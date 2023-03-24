import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { setIcon } from "../../utils/setIcon";

interface MarkerProps {
  position: [number, number];
  equipType: string;
}

export const MarkerComponent: React.FC<MarkerProps> = ({ position, equipType }) => {
  const pinIcon = new Icon({
    iconUrl: setIcon(equipType),
    iconSize: [40, 40],
    iconAnchor: [12, 41],
  });

  return (
    <Marker position={position} icon={pinIcon}>
      <Popup offset={[10, -35]}>
        <div>
          <h2>My Custom Popup</h2>
          <p>This is some custom content for my popup!</p>
        </div>
      </Popup>
    </Marker>
  );
};
