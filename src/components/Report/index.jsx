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
                <div className='container report-equipment'>
                <h3 className='report-name'>Equipamento: {equipment.name}</h3>
                <h3 className='report-model'>Tipo: {equipment.modelName}</h3>
                </div>

                <div className='container report-position'>
                    <h3 className='report-position-title'>Posição: </h3>
                    <h4 className='report-lat'>latitude:{lastPosition.lat}</h4>
                    <h4 className='report-lon'>longitude:{lastPosition.lon}</h4>
                    <h3 className='report-position-updated'>atualizado em:</h3>
                    <p>{lastDatePosition}</p>
                </div>
                <div className='cotainer report-state'>
                    <h3 className='report-state'>Estado: {stateStatus.name}</h3>
                    <h3 className='report-state-updated'>atualizado em:</h3>
                    <p className='report-state-updated-value'>{lastDateState}</p>
                </div>
            </li>
        </>
    )
}

export default Report;