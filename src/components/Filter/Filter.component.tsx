import React, { useCallback, useEffect, useState } from 'react';
import { Equipment, EquipmentsWithPositions } from '../../models/Equipment.model';
import equipment from '../../assets/data/equipment.json';
import './Filter.styles.css';
import Select, { MultiValue } from 'react-select';

interface Props {
  equipmentsList: EquipmentsWithPositions[];
  setEquipmentsList: React.Dispatch<React.SetStateAction<EquipmentsWithPositions[]>>;
}

interface Filter {
  value: string;
  label: string;
}

const Filter: React.FC<Props> = ({ equipmentsList, setEquipmentsList }) => {
  const [filteredOption, setFilteredOption] = useState<MultiValue<Filter> | []>([]);

  const getFilteredItems = useCallback(() => {
    const filterResult = equipmentsList.filter((equipment) => {
      return filteredOption.some((filter: Filter) => {
        return filter.value === equipment.id;
      });
    });
    setEquipmentsList(filterResult);
  }, [filteredOption, setEquipmentsList]);

  useEffect(() => {
    if (filteredOption.length) {
      getFilteredItems();
    } else {
      setEquipmentsList(equipmentsList);
    }
  }, [filteredOption]);

  const options = equipment.map((equipment: Equipment) => ({
    value: equipment.id,
    label: equipment.name,
  }));

  const handleChange = (selectedOption: MultiValue<Filter>): void => {
    setFilteredOption(selectedOption);
  };

  return (
    <div className='filterContainer'>
      <img src={require('../../assets/img/aiko.png')} height='35px' alt='Aiko' />
      <div className='filterSelectContainer'>
        <Select
          placeholder='Filtrar por máquina(s)'
          options={options}
          isMulti
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Filter;
