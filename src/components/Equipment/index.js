import './Equipment.css';

const Equipment = ({ equipment }) => {
    
    return (
        <li className="container card">
            <h2>{equipment.name}</h2>
            <h3>{equipment.modelName}</h3>
              
        </li>
    )
}

export default Equipment;