import React from "react"
import { Popup } from 'react-leaflet';

import '../style/NewPopup.css'

function NewPopup({ getEquipmentLastState, getEquipmentModelName, getEquipmentName, getFormatedDate }) {
    function getDate() {
        return getFormatedDate(getEquipmentLastState)
    }

    return (
        <Popup riseOnHover={true} autoPanOnFocus={false} keyboard={true}>
            <h3><strong>{getEquipmentName}</strong> - <span>{getEquipmentModelName}</span></h3>
            <p><strong>Dia: </strong> <span>{getDate()}</span></p>
            <p><strong>Estado: </strong> <span style={getEquipmentLastState.props.style}>{getEquipmentLastState.props.name}</span></p>
        </Popup>
    );
}

export default NewPopup