import './Equipment.css';

const Equipment = (props) => {
    const equipment = props.equipment;

    return (
        <li className="container card" onClick={() => props.setEqPreview(equipment)}>
            <h2>{equipment.name}</h2>
            <h3>{equipment.modelName}</h3>
              
        </li>
    )
}

export default Equipment;