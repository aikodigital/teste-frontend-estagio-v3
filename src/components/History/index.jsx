import './History.css'
import { eqState, descendingOrder } from "../../entities/equipment";

const History = ({ equipment }) => {

    if (equipment == null){
        return <div></div>;
    }

    const stateHistory = equipment.stateHistory
                            .sort(descendingOrder).map(state =>{
                                return (
                                    <p key={state.date}>
                                        {equipment.showDate(state.date)}:&#160;
                                        {equipment.showState(state.equipmentStateId)}
                                        </p>
                                )
                            })

    return (
        <>
                    <h3>histórico de estado do equimento:</h3>
                <div className='container state-history'>
                    {stateHistory}
                </div>
        </>
    )
}

export default History;