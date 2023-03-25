import React from "react"
import { Popup } from 'react-leaflet';

function NewPopup({ allStateHistory, equipmentState, eqpId }) {
    function getEquipmentLastState() {
        let lastState = {}

        // encontra o id do equipamento na lista
        const item = allStateHistory.find(item => item.equipmentId === eqpId);

        // retorna a ultima posição salva, caso exista
        if (item) {
            lastState = item.states[item.states.length - 1];
            const item2 = equipmentState.find(item => item.id === lastState.equipmentStateId);
            lastState = {
                ...lastState,
                props: {
                    ...item2, style: {
                        color: item2.color
                    }
                }
            }

            return lastState;
        }
        else {
            return null;
        }
    }

    function getFormatedDate() {
        const date = new Date(getEquipmentLastState().date);
        // const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
            <p><strong>Dia: </strong> <span>{getFormatedDate()}</span></p>
            <p><strong>Estado: </strong> <span style={getEquipmentLastState().props.style}>{getEquipmentLastState().props.name}</span></p>
        </Popup>
    );
}

export default NewPopup