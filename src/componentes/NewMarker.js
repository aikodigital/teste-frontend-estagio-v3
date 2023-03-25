import React from "react"
import { Marker, Popup } from 'react-leaflet';
import NewPopup from './NewPopup';

function NewMarker({ key, eqpId, eqpNameId, allPosHistory }) {
    function getLastPosition() {
        // encontra o id do equipamento la lista
        const item = allPosHistory.find(item => item.equipmentId === eqpId);
        // retorna a ultima posição salva, caso exista
        if (item) {
            const lastPosition = item.positions[item.positions.length - 1];
            return [lastPosition.lat, lastPosition.lon];
        }
        return null;
    }

    return (
        <Marker Marker key={key} riseOnHover={true} position={getLastPosition()}>
            <NewPopup />
        </Marker >
    )
}

export default NewMarker