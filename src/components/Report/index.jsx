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
    
    const calcProductivity = (statesTotal = equipment.dayStatesTotal) =>{
        let totalOperation = 0
        statesTotal.forEach(day =>{
            totalOperation += day.stateHours.totalOperando
        })
        return totalOperation / (24 * statesTotal.length) * 100;
    }

    const productivity = calcProductivity();

    const calcEarning = (statesTotal = equipment.dayStatesTotal) => {
        
        const total = {operando: 0, manutencao: 0, parado: 0};
        statesTotal.forEach(day =>{
            total.operando += day.stateHours.totalOperando;
            total.manutencao += day.stateHours.totalManutencao;
            total.parado += day.stateHours.totalParado;
        })
        
        const{operando, manutencao, parado} = equipment.hourlyEarnings;
        console.log(operando,total.operando, manutencao, total.manutencao,parado , total.parado)
        return (operando * total.operando) + (manutencao * total.manutencao) + (parado * total.parado);
    }

    const formatMoneyBR = (value)=>{
        const arrayValue = value.toFixed(2).split('');
        arrayValue.splice(arrayValue.length -3, 1, ',');
        const newArrayValue = [];
        let countDigits = 0;
        for (let i = arrayValue.length -1; i >= 0; i--){
            if(i >= arrayValue.length -3){
                newArrayValue.unshift(arrayValue[i]);
            }
            else{
                newArrayValue.unshift(arrayValue[i]);
                countDigits++;
                if(countDigits % 3 == 0){
                    newArrayValue.unshift('.')
                }
            }

            }
            return newArrayValue.join("")
    }

    const earning = calcEarning();

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
                        <h3 className='report-data'>Ganho: R$ {formatMoneyBR(earning)}</h3>
                    </div>


                </div>
            </li>
        </>
    )
}

export default Report;