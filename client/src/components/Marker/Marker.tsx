import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

export const pinIcon = new Icon({
  iconUrl: "../../../public/harverster.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

interface MarkerProps {
  position: [number, number];
}

export const MarkerComponent: React.FC<MarkerProps> = ({ position }) => {
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
