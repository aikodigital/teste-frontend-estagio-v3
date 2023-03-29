import * as React from "react";
import * as MU from "@mui/material";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { apiKey } from "../apiKey";
import { equipmentPositionHistoryFile } from "../data/equipmentPositionHistory";
import { getEquipmentsLastPosition } from "./getEquipmentsLastPosition";
import { getEquipmentLastState } from "./getEquipmentLastState";
import { getEquipmentLastStates } from "./getEquipmentHistory";
import { HistoryEquipmentDialog } from "./HistoryEquipmentDialog";
import { getEquipment } from "./getEquipment";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -19.171667,
  lng: -46.044589,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const equipments = equipmentPositionHistoryFile;
  const eqpPositions = getEquipmentsLastPosition(equipments);

  let eqpLastState = [];

  eqpPositions.forEach((eqp) => {
    eqpLastState.push({
      lat: eqp.lastPosition.lat,
      lon: eqp.lastPosition.lon,
      state: getEquipmentLastState(eqp.equipment.equipmentId),
    });
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [equipHistory, setEquipHistory] = React.useState("");
  const [eqpDetails, setEqpDetails] = React.useState("");

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        {eqpLastState.map((eqp, i) => (
          <Marker
            onClick={() => {
              setOpenDialog(true);
              setEquipHistory(getEquipmentLastStates(eqp.state.equipment));
              setEqpDetails(getEquipment(eqp.state.equipment));
            }}
            key={i}
            position={{
              lat: eqp.lat,
              lng: eqp.lon,
            }}
            options={{
              icon: {
                url:
                  eqp.state.lastState.id ===
                  "baff9783-84e8-4e01-874b-6fd743b875ad"
                    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    : eqp.state.lastState.id ===
                      "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
                    ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    : eqp.state.lastState.id ===
                      "0808344c-454b-4c36-89e8-d7687e692d57"
                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : null,
              },
            }}
          />
        ))}
        {
          <HistoryEquipmentDialog
            open={openDialog}
            close={handleCloseDialog}
            eqp={equipHistory}
            details={eqpDetails}
          />
        }
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
