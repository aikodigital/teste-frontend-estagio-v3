import { Box, Flex } from "@chakra-ui/react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function Map() {
  const position: LatLngExpression = [-19.81, -43.9575];

  return (
    <Box h="100vh" w="80%">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

export default Map;
