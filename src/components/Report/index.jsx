import './Report.css'
import { eqState } from "../../entities/equipment";

const Report = ({ equipment }) => {
    const lastPosition = equipment.lastPosition();
    const lastState = equipment.lastState();
    const stateStatus = eqState.filter(state => state.id === lastState.equipmentStateId)[0];
    const lastDatePosition = equipment.showDate(lastPosition.date);
    const lastDateState = equipment.showDate(lastState.date);

    return (
        <>
            <li className='container report'>
                
                <h2 className='report-name'>{equipment.name}</h2>
                <h3 className='report-model'>{equipment.modelName}</h3>
                <h3 className='report-position'>Posição: </h3>
                <h4 className='report-lat'>lat:</h4>
                <p className='report-lat-value'>{lastPosition.lat}</p>
                <h4 className='report-lon'>lon:</h4>
                <p className='report-lon-value'>{lastPosition.lon}</p>
                <h3 className='report-position-updated'>atualizado em:</h3>
                <p className='report-position-updated-value'>{lastDatePosition}</p>
                <h3 className='report-state'>Estado:</h3>
                <p className='report-state-value'>{stateStatus.name}</p>
                <h3 className='report-state-updated'>atualizado em:</h3>
                <p className='report-state-updated-value'>{lastDateState}</p>
            </li>
        </>
    )
}

export default Report;