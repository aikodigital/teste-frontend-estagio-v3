import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'



export const Map = () => {
    return (
        <MapContainer className='MapContainer' center={[-19.192595, -46.061072]} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "70vw" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-19.192595, -46.061072]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )
}
