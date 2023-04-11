import React, { useState } from 'react';
import styled from 'styled-components';



const Filter = ({ mudarEstado }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    mudarEstado(filter);
  };

  return (
    <FilterContainer>
      <FilterOption active={activeFilter === 'all'} onClick={() => handleFilterClick('all')}>
        Todos
      </FilterOption>
      <FilterOption active={activeFilter === 'Operando'} onClick={() => handleFilterClick('Operando')}>
        Operando
      </FilterOption>
      <FilterOption active={activeFilter === 'Manutenção'} onClick={() => handleFilterClick('Manutenção')}>
        Manutenção
      </FilterOption>
      <FilterOption active={activeFilter === 'Parado'} onClick={() => handleFilterClick('Parado')}>
        Parado
      </FilterOption>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterOption = styled.button`
  background-color: ${(props) => (props.active ? '#00df00;' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#00df00;')};
  border: 1px solid #00df00;;
  border-radius: 4px;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #007aff;
    color: #ffffff;
  }
`;