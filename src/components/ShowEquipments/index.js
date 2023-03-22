import Equipment from "../Equipment";

const ShowEquipments = ({equipments}) =>{
    
    const listEquipments = equipments.map(equipment => <Equipment key={equipment.id} equipment={equipment} />)
    
    return(
        <ul>
            {listEquipments}
        </ul>
    )
}

export default ShowEquipments;