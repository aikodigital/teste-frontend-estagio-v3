import React from "react"

import "../style/Filter.css"

function Filter({ handleChange, handleChangeStates, filter, filterStates }) {
    function getClasses(item) {
        return `--filter-item ${filter === item ? "--filter-item-active" : ""}`
    }

    function getClassesEstados(item) {
        return `--filter-item ${filterStates === item ? "--filter-item-active" : ""}`
    }

    return (
        <div className="--filter-container">
            <nav className="--filter-nav">
                <div className="main-filters">
                    <ul className="--filter-list">
                        <li className={getClasses(0)} onClick={() => handleChange(0)}>Todos</li>
                        <li className={getClasses(1)} onClick={() => handleChange(1)}>Estado</li>
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
                </div>
            </nav>
        </div>

    );
}
export default Filter;