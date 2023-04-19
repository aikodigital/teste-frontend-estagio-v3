import { React, useState, useEffect } from "react"

import "../style/Filter.css"

function Filter({ equipment, handleChange, handleChangeStates, handleFilterTraj, filter, filterStates, filterTraj }) {
    const [searchItens, setSearchItens] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    function handleInputChange(event) {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        const filteredObj = equipment.filter((iten) =>
            iten.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filteredObj.length === 0) {
            setSearchItens([]);
        } else {
            setSearchItens(filteredObj);
        }
    }, [searchValue, equipment]);

    function handleSearchClick(id) {
        setSearchItens([])
        setSearchValue('');
        handleFilterTraj(id)
    }

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

    function getEquipmentsSearch() {
        let list;

        list = searchItens.map((eqp, key) => (
            <li key={key} id={eqp.id} onClick={(e) => handleSearchClick(e.target.id)}>{eqp.name}</li>
        ));

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
                        <div className="--filter-dropdown">
                            <select value={filterStates} onChange={(e) => handleChangeStates(e.target.value)}>
                                <option key={0} value={0} className={getClassesEstados(0)}>Operando</option>
                                <option key={1} value={1} className={getClassesEstados(1)}>Parado</option>
                                <option key={2} value={2} className={getClassesEstados(2)}>Manutenção</option>
                            </select>
                        </div>
                    }
                    {filter === 2 &&
                        <div className="traj-container">
                            <div className="--filter-dropdown">
                                <select value={filterTraj} onChange={(e) => handleFilterTraj(e.target.value)}>
                                    {getEquipments()}
                                </select>
                            </div>
                            <div className="search-bar-traj">
                                <input type="text" placeholder="Pesquisar equipamentos" value={searchValue} onChange={handleInputChange} />
                                {searchItens.length !== 0 && searchValue !== '' &&
                                    <ul>
                                        {getEquipmentsSearch()}
                                    </ul>}
                                {searchValue !== '' && searchItens.length === 0 &&
                                    <ul>
                                        <li>Nenhum equipamento encontrado</li>
                                    </ul>
                                }
                            </div>
                        </div>
                    }

                </div>
            </nav>
        </div>

    );
}
export default Filter;