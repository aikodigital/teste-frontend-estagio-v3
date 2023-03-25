import React from 'react';
import { Marker } from 'react-leaflet';

import NewPopup from './NewPopup';
import operandoImg from '../img/operando.svg'
import manutencaoImg from '../img/manutencao.svg'
import paradoImg from '../img/parado.svg'


import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function NewMarker({ eqpId, eqpNameId, allPosHistory, equipmentState, allStateHistory }) {

    function getLastPosition() {
        // encontra o id do equipamento na lista
        const item = allPosHistory.find(item => item.equipmentId === eqpId);
        // retorna a ultima posição salva, caso exista
        if (item) {
            const lastPosition = item.positions[item.positions.length - 1];
            return [lastPosition.lat, lastPosition.lon];
        }
        return null;
    }

    function getEquipmentLastStateColor() {
        let lastState = {}

        // encontra o id do equipamento na lista
        const item = allStateHistory.find(item => item.equipmentId === eqpId);

        // retorna a ultima posição salva, caso exista
        if (item) {
            lastState = item.states[item.states.length - 1];
            const item2 = equipmentState.find(item => item.id === lastState.equipmentStateId);
            switch (item2.color) {
                case "#2ecc71":
                    return operandoImg
                case "#f1c40f":
                    return paradoImg
                case "#e74c3c":
                    return manutencaoImg
                default:
                    return null
            }
        }
        else {
            return null;
        }
    }

    const customIcon = L.icon({
        iconUrl: getEquipmentLastStateColor(),
        iconSize: [50, 105],
        iconAnchor: [25, 52.5],
        popupAnchor: [0, -30],
        shadowUrl: iconShadow,
        shadowSize: [68, 95],
        shadowAnchor: [12, 74]
    });

    return (
        <Marker
            riseOnHover={true}
            position={getLastPosition()}
            icon={customIcon}
            eventHandlers={{
                // abre os popups com mouseover
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
            }}>
            <NewPopup
                allStateHistory={allStateHistory}
                equipmentState={equipmentState}
                eqpId={eqpId}
            />
        </Marker>
    )
}

export default NewMarker;
