import React from "react"
import {Marker, Popup} from 'react-leaflet';

function NewPopup() {
    return (
        <Popup riseOnHover={true} autoPanOnFocus={false} keyboard={true}>
            Nome: <br />
            Id: <br />
        </Popup>
    );
}

export default NewPopup