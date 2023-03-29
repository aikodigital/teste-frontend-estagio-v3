import { useDispatch, useSelector } from 'react-redux';
import models from '../../data/equipmentModel.json';
import eqStates from '../../data/equipmentState.json';
import InfoFilter from '../InfoFilter/Index';
import { changeEqState, changeModel } from '../../redux/mapSlice';
import styles from './FiltersHome.module.scss';

export default function FiltersHome() {

    const dispatch = useDispatch();
    const model = useSelector( state=> state.map.model)
    const eqState = useSelector( state=> state.map.eqState)
    return (
        <aside>
            <div className={styles.filtersHome}>
                <h3 className={styles.filtersHome__title}> Filtro de Informações </h3>
                <InfoFilter
                    label={'Modelo: '}
                    equipments={models}
                    value={model}
                    equipmentAtualize={elem => dispatch(changeModel(elem))}
                />
                <InfoFilter
                    label={'Status: '}
                    equipments={eqStates}
                    value={eqState}
                    equipmentAtualize={elem => dispatch(changeEqState(elem))}
                />
                <ul>
                    <li><svg stroke="currentColor" fill="#2ecc71" stroke-width="0" viewBox="0 0 384 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"> <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg> Operando</li>
                    <li><svg stroke="currentColor" fill="#f1c40f" stroke-width="0" viewBox="0 0 384 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"> <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg> Parado</li>
                    <li><svg stroke="currentColor" fill="#e74c3c" stroke-width="0" viewBox="0 0 384 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"> <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg> Manutenção</li>
                </ul>

            </div>
        </aside>
    )
}