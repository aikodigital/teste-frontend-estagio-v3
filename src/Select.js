import React from 'react';
import equipmentModel from './data/equipmentModel.json';
import equipmentState from './data/equipmentState.json';
import SelectChange from './SelectChange';

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
  
    return (
        <div className='filter'>
            <h2>Filtro:</h2>
            <select onChange={SelectChange}>
                <option value='todos'>Todos</option>
                {options}
            </select>
       </div>
    );
}

export default Select;