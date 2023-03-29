import './Equipment.css';
import { eqState } from '../../entities/equipment';

const Equipment = (props) => {
    const equipment = props.equipment;
    console.log(equipment.id);
    const color = eqState.filter(state => state.id === equipment.lastState().equipmentStateId)[0].color;
    const selected = equipment == props.report;

    return (
        <li className={`card ${selected? 'card_selected' : ''}`} onClick={() => props.setEqPreview(equipment)}>
            <h2 className={`card_name ${selected? 'card_name_selected' : ''}`}>{equipment.name}</h2>
            <h3 className={`card_model ${selected? 'card_model_selected' : ''}`}>{equipment.modelName}</h3>
            <div className='card_state' style={{backgroundColor: color}}/>
        </li>
    )
}

export default Equipment;