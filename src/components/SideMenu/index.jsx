import './SideMenu.css'
import Report from '../Report';
import Equipment from '../Equipment';

const SideMenu = ({ equipments }) => {

    const listEquipments =  equipments
                            .map( equipment => <Equipment key={equipment.id} equipment={equipment}/> );

    return (
        <>
            <ul className='container side-menu'>
                <li className='side-menu__title'>equipamentos:</li>
                {listEquipments}
                <li className='side-menu__title'>relatório:</li>
                <Report equipment={equipments[0]} />
            </ul>
        </>
    )
}

export default SideMenu;