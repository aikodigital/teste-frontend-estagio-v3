import React from 'react';
import equipmentModel from './data/equipmentModel.json';
import equipmentState from './data/equipmentState.json';
import SelectChange from './SelectChange';
import equipment from './data/equipment.json';
import SelectChange2 from './SelectChange2';

function Select() {
    //encontra os nomes dos estados
    const Names = {};
    equipmentState.forEach((equipmentState) => {
        Names[equipmentState.id] = equipmentState.name;
    });
    //encontra os nomes dos modelos
    equipmentModel.forEach((equipmentModel) => {
        Names[equipmentModel.id] = equipmentModel.name;//nome do modelo
    });
  
    // Cria uma lista de opções
    const options = Object.keys(Names).map(key => (
      <option key={key} value={key}>
        {Names[key]}
      </option>
    ));
    // encontra todos os equipamentos
    const equipmentNames = {};
    equipment.forEach((equipment) => {
        equipmentNames[equipment.id] = equipment.name;
    });
    // Cria uma lista com todos os equipamentos
    const options2 = Object.keys(equipmentNames).map(key => (
        <option key={key} value={key}>
          {equipmentNames[key]}
        </option>
    ));
    return (
        <div className='filter'>
            <h2>Seletor:</h2>
            <select onChange={SelectChange}>
                <option value='todos'>Todos</option>
                {options}
            </select>
            <h2>Equipmento:</h2>
            <select onChange={SelectChange2} >
                <option value='todos'>Todos</option>
                {options2}
            </select>
       </div>
    );
}

export default Select;