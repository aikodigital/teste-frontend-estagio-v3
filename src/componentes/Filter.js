import React from "react"

import "../style/Filter.css"

function Filter({ equipment, handleChange, handleChangeStates, handleFilterTraj, filter, filterStates, filterTraj }) {
    function getClasses(item) {
        return `--filter-item ${filter === item ? "--filter-item-active" : ""}`
    }

    function getClassesEstados(item) {
        return `--filter-item ${filterStates === item ? "--filter-item-active" : ""}`
    }

    function getEquipments() {
        const list = []

        equipment.forEach((eqp, key) => {
            list.push(
                <option key={key} value={eqp.id} className={getClassesEstados(eqp.id)}>{eqp.name}</option>
            );
        });

        return list;
    }


    return (
        <div className="--filter-container">
            <nav className="--filter-nav">
                <div className="main-filters">
                    <ul className="--filter-list">
                        <li className={getClasses(0)} onClick={() => handleChange(0)}>Todos</li>
                        <li className={getClasses(1)} onClick={() => handleChange(1)}>Estado</li>
                        <li className={getClasses(2)} onClick={() => handleChange(2)}>Trajetória</li>
                    </ul>
                </div>
                <div>
                    {filter === 1 &&
                        <ul className="--filter-list">
                            <li className={getClassesEstados(0)} onClick={() => handleChangeStates(0)}>Operando</li>
                            <li className={getClassesEstados(1)} onClick={() => handleChangeStates(1)}>Parado</li>
                            <li className={getClassesEstados(2)} onClick={() => handleChangeStates(2)}>Manutenção</li>
                        </ul>
                    }
                    {filter === 2 &&
                        <div className="--filter-dropdown">
                            <select value={filterTraj} onChange={(e) => handleFilterTraj(e.target.value)}>
                                {getEquipments()}
                            </select>
                        </div>
                    }

                </div>
            </nav>
        </div>

    );
}
export default Filter;