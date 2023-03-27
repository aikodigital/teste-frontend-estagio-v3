import './SideMenu.css'
import Report from '../Report';
import Equipment from '../Equipment';
import { useState } from 'react';

const SideMenu = (props) => {

    const [report, setReport] = useState(null);


    
    const setEqPreview = (equipment) =>{
        const position = equipment.lastPosition();
        props.setZoomIn(13);
        props.setPosition([position.lat, position.lon]);
        setReport(equipment);
    }

    const equipments = props.equipments;

    const listEquipments =  equipments
                            .map( equipment => <Equipment 
                                                    key={equipment.id} 
                                                    equipment={equipment}
                                                    setEqPreview={setEqPreview}
                                                    set/> );

    return (
        <>
            <section className='container side-menu'>
                <ul>
                    <li className='side-menu__title'>equipamentos:</li>
                    {listEquipments}
                </ul>
                <h2 className='side-menu__title'>relatório:</h2>
                <Report equipment={report} />
            </section>
        </>
    )
}

export default SideMenu;