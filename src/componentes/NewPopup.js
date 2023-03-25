import React from "react"
import { Popup } from 'react-leaflet';

import '../style/NewPopup.css'

function NewPopup({ getEquipmentLastState, getEquipmentModelName, getEquipmentName }) {
    function getFormatedDate() {
        const date = new Date(getEquipmentLastState.date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            hour12: false,
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('pt-BR', options);
    }

    return (
        <Popup riseOnHover={true} autoPanOnFocus={false} keyboard={true}>
            <h3><strong>{getEquipmentName}</strong> - <span>{getEquipmentModelName}</span></h3>
            <p><strong>Dia: </strong> <span>{getFormatedDate()}</span></p>
            <p><strong>Estado: </strong> <span style={getEquipmentLastState.props.style}>{getEquipmentLastState.props.name}</span></p>
        </Popup>
    );
}

export default NewPopup