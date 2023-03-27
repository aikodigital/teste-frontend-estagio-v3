import { Icon } from "leaflet";
import { Marker } from "react-leaflet";
import { Equipament } from "../../class/Equipment";
import { setIcon } from "../../utils/setIcon";
import { PopUp } from "../PopUp/Popup";

interface MarkerProps {
  equipment: Equipament;
}

export const MarkerComponent: React.FC<MarkerProps> = ({equipment}) => {
  const state = equipment.getMostRecentState();
  const position = equipment.getMostRecentPosition();

  if (!position) {
    return null;
  }

  const pinIcon = new Icon({
    iconUrl: setIcon(equipment.typeId, state[2]),
    iconSize: [40, 40],
    iconAnchor: [12, 41],
  });


  

  return (
    <Marker position={[position[0] , position[1]]}
    icon={pinIcon} >
      <PopUp/>
    </Marker>
  );
};
