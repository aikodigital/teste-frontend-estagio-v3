import './Report.css'
import { eqState, descendingOrder } from "../../entities/equipment";

const Report = ({ equipment }) => {
    if (equipment == null){
        return <li></li>;
    }
    const lastPosition = equipment.lastPosition();
    const lastState = equipment.lastState();
    const stateStatus = eqState.filter(state => state.id === lastState.equipmentStateId)[0];
    const lastDatePosition = equipment.showDate(lastPosition.date);
    const lastDateState = equipment.showDate(lastState.date);

    console.log(lastState)
    console.log("state",equipment.showState('0808344c-454b-4c36-89e8-d7687e692d57'));

    const stateHistory = equipment.stateHistory
                            .sort(descendingOrder).map(state =>{
                                return (
                                    <p>
                                        {equipment.showDate(state.date)}:&#160;
                                        {equipment.showState(state.equipmentStateId)}
                                        </p>
                                )
                            })

    return (
        <>
            <li className='container report'>
                <div className='container report-info'>
                    <div className='container report-equipment'>
                    <h3 className='report-name'>Equipamento: {equipment.name}</h3>
                    <h3 className='report-model'>Tipo: {equipment.modelName}</h3>
                    </div>

                    <div className='container report-position'>
                        <h4 className='report-coordinates'>Posição: lat:{lastPosition.lat} lon:{lastPosition.lon}</h4>
                        <h3 className='report-position-updated'>atualizado em: {lastDatePosition}</h3>
                    </div>
                    <div className='cotainer report-state'>
                        <h3 className='report-state'>Estado: {stateStatus.name}</h3>
                        <h3 className='report-state-updated'>atualizado em: {lastDateState}</h3>
                    </div>
                </div>
            </li>
                    <h3>histórico de estado do equimento:</h3>
                <div className='container report__state-history'>
                    {stateHistory}
                </div>
        </>
    )
}

export default Report;