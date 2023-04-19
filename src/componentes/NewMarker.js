import React from 'react';
import { Marker } from 'react-leaflet';

import NewPopup from './NewPopup';

function NewMarker({ handleClick, eqpId, getEquipmentModelName, getEquipmentLastState, getEquipmentName, getLastPosition, customIcon ,getFormatedDate}) {
    function createIcon() {
        return customIcon(eqpId)
    }

    function lastPos() {
        return getLastPosition(eqpId)
    }

    function getModel() {
        return getEquipmentModelName(eqpId)
    }

    function getState() {
        return getEquipmentLastState(eqpId)
    }

    function getName() {
        return getEquipmentName(eqpId)
    }

    return (
        <Marker
            riseOnHover={true}
            position={lastPos()}
            icon={createIcon()}
            eventHandlers={{
                // abre os popups com mouseover
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => handleClick(eqpId),
            }}>
            <NewPopup
                eqpId={eqpId}
                getFormatedDate={getFormatedDate}
                getEquipmentModelName={getModel()}
                getEquipmentLastState={getState()}
                getEquipmentName={getName()}
            />
        </Marker>
    )
}

export default NewMarker;
