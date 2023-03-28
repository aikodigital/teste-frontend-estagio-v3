import './Equipment.css';
import { eqState } from '../../entities/equipment';

const Equipment = (props) => {
    const equipment = props.equipment;
    const coordinates = equipment.lastPosition();
    const color = eqState.filter(state => state.id === equipment.lastState().equipmentStateId)[0].color;

    return (
        <li className="card" onClick={() => props.setEqPreview(equipment)}>
             
            <h2 className='card_name'>{equipment.name}</h2>
            <h3 className='card_model'>{equipment.modelName}</h3>
            {/* <h3 className='card_lat'>lat:{coordinates.lat}</h3>
            <h3 className='card_lon'>lon:{coordinates.lon}</h3> */}
            <div className='card_state' style={{backgroundColor: color}}/>
              
        </li>
    )
}

export default Equipment;