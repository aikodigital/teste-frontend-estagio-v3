import React, { useRef, useState } from "react";

import "./style.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import osm from "./osm-provider";

function SectionMap() {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const mapRef = useRef();
  const ZOOM_LEVEL = 3;

  return (
    <section className="section-map">
      <div className="conatainer-map">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
        </MapContainer>
      </div>
      <aside className="subtitle">LEGENDA</aside>
    </section>
  );
}

export default SectionMap;
