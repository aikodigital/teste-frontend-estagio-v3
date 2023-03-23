import './SideBar.css'
import Report from '../Report';
import Equipment from '../Equipment';

const SideBar = ({ equipments }) => {

    const listEquipments =  equipments
                            .map( equipment => <Equipment key={equipment.id} equipment={equipment}/> );

    return (
        <>
            <ul className='container side-bar'>
                <li className='side-bar__title'>equipamentos:</li>
                {listEquipments}
                <li className='side-bar__title'>relatório:</li>
                <Report equipment={equipments[0]} />
            </ul>
        </>
    )
}

export default SideBar;