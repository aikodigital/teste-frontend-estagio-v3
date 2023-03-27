import React from "react";
import { Popup } from "react-leaflet";

export const PopUp = () => {
  return (
    <Popup offset={[10, -35]}>
      <div>
        <h2>My Custom Popup</h2>
        <p>This is some custom content for my popup!</p>
      </div>
    </Popup>
  );
};
