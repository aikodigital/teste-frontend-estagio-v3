import './SideMenu.css'
import Report from '../Report';
import History from '../History';
import Equipment from '../Equipment';
import { useState } from 'react';

const SideMenu = (props) => {
    
    const report = props.report;
    const setReport = props.setReport;

    const [history, setHistory] = useState(false);

    const showHistory = () => {
        history? setHistory(false): setHistory(true);
    }


    
    const setEqPreview = (equipment) =>{
        const position = equipment.lastPosition();
        props.setZoomIn(13);
        props.setPosition([position.lat, position.lon]);
        setReport(equipment);
    }

    const equipments = props.equipments;

    const listEquipments =  equipments
                            .map( equipment => <Equipment
                                                    report={report}
                                                    key={equipment.id} 
                                                    equipment={equipment}
                                                    setEqPreview={setEqPreview}
                                                    set/> );

    return (
        <>
        <section className='container side-menuA'>
                <ul>
                    <li className='side-menu__title'>equipamentos:</li>
                    {listEquipments}
                </ul>
                <h2 className='side-menu__title'>relatório:</h2>
                <Report equipment={report} showHistory={showHistory} show={history}/>
            </section>
            <section style={{display: `${history? 'flex': 'none' }`}} className='container side-menuB'>
                <History equipment = {report}/>
            </section>
        </>
    )
}

export default SideMenu;