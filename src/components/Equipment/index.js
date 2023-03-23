import { eqState } from "../../entities/equipment";

console.log(eqState);

const Equipment = ({ equipment }) => {
    
    const lastPosition = equipment.lastPosition();
    console.log(lastPosition);
    const lastState = equipment.lastState();
    const stateStatus = eqState.filter(state => state.id === lastState.equipmentStateId)[0];

    return (
        <li className="cards" style={{backgroundColor: `${stateStatus.color}`}}>
            <h2>{equipment.name}</h2>
            <h3>{equipment.modelName}</h3>
            <h3>Posição: </h3>
            <h4>{lastPosition.lat}</h4>
            <h4>{lastPosition.lon}</h4>
            <h4>{lastPosition.date}</h4>
            <h3>Estado:</h3>
            <h4>{stateStatus.name}</h4>
            <h4>{lastState.date}</h4>
            
            
        </li>
    )
}

export default Equipment;