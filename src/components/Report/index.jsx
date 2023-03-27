import './Report.css'
import { eqState, descendingOrder } from "../../entities/equipment";

const Report = ({ equipment }) => {

    console.log(equipment);

    if (equipment == null){
        return <li></li>;
    }
    const lastPosition = equipment.lastPosition();
    const lastState = equipment.lastState();
    const stateStatus = eqState.filter(state => state.id === lastState.equipmentStateId)[0];
    const lastDatePosition = equipment.showDate(lastPosition.date);
    const lastDateState = equipment.showDate(lastState.date);

    
    const stateHistory = equipment.stateHistory
                            .sort(descendingOrder).map(state =>{
                                return (
                                    <p key={state.date}>
                                        {equipment.showDate(state.date)}:&#160;
                                        {equipment.showState(state.equipmentStateId)}
                                    </p>
                                )
                            })
    
    const calcProductivity = () =>{
        let totalOperation = 0
        equipment.dayStatesTotal.forEach(day =>{
            totalOperation += day.stateHours.totalOperando
        })
        return totalOperation / (24 * equipment.dayStatesTotal.length) * 100;
    }

    const productivity = calcProductivity();

    

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
                    <div className='cotainer report-data'>
                        <h3 className='report-data'>Produtividade: {productivity.toFixed(1)}%</h3>
                        <h3 className='report-data'>Produtividade: {productivity.toFixed(1)}%</h3>
                    </div>


                </div>
            </li>
        </>
    )
}

export default Report;