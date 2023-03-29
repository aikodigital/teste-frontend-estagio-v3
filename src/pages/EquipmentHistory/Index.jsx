import styles from './EquipmentHistory.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { changeAll } from '../../redux/selectedEquipment';
import { EquipmentStateRepository } from "../../repositories/equipmentStateRepository";


export default function EquipmentHistory() {
    const equipmentList = useSelector(state => state.equipments.equipments)
    const dispatch = useDispatch();
    const selectedEquipment = useSelector(state => state.selectedEquipment)

    function reportList() {
        return equipmentList.map(equip => (<li onClick={(evt) => equipmentSelector(evt, equip.id)} key={equip.id}> {equip.name} </li>))
    }

    function equipmentSelector(evt, id) {
        evt.preventDefault();
        let currentEquipment = equipmentList.find(equip => equip.id === id)
        let tempEquip = {
            id: currentEquipment.id,
            name: currentEquipment.name,
            eqState: currentEquipment.currentState.stateName,
            isLoged: true,
            model: currentEquipment.model,
        }
        dispatch(changeAll(tempEquip))

        return currentEquipment;
    }
    function convertDate(date) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    function stateReport(equip) {
        const state = new EquipmentStateRepository();
        let currentEquipment = equipmentList.find(ele => ele.id === equip.id)
        let reportList = currentEquipment.allState.states.map((elem, index) => (
            <li key={index}>
                <p><span>Data:  </span>{convertDate(new Date(elem.date))} <span> Status: </span> {state.getAll().find(state => state.id === elem.equipmentStateId).name} </p>
            </li>
        ))
        return reportList
    }

    function equipmentReport(equip) {
        if (equip.id !== '') {
            return (
                <div className={styles.history__statusReport__list}>
                    <h4>Nome do Equipamento: <span>{equip.name}</span> </h4>
                    <h4>Modelo: <span>{equip.model}</span> </h4>
                    <h4>Estado Atual:<span> {equip.eqState} </span> </h4>
                    <ul>
                        {stateReport(equip)}
                    </ul>

                </div>
            )
        } else return ""

    }

    

    return (
        <main className={styles.history}>
            <div className={styles.history__list}>
                <h2>Lista de Equipamentos </h2>
                <ul>
                    {reportList()}
                </ul>
            </div >
            <div className={styles.history__statusReport}>
                <h2>Relatorio do equipamento</h2>
                
                {equipmentReport(selectedEquipment)}
            </div>

        </main>
    )
}