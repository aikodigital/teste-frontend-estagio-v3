import React, { useState } from 'react';
import styled from 'styled-components';
import Maps from './Components/Maps';
import Filter from './Components/Filter';

const Home = () => {
  const [estado, setEstado] = useState('all');
  const mudarEstado = (estado) => {
    setEstado(estado);
  };

  return (
    <Container>
      <FilterContainer>
        <FilterText> Filtrar por estado</FilterText>
        <Filter mudarEstado={mudarEstado} />
      </FilterContainer>
      <MapContainer>
        <MapText>
          Localize seus equipamentos
        </MapText>
        <Maps estado={estado} />
      </MapContainer>
    </Container>
  );
};

export default Home;

const Container = styled.main`
  margin-top: 60px;
  padding: 20px;
  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  h3 {
    margin-bottom: 10px;
  }
`;

const FilterText = styled.h3`
  text-align: center;
  margin-bottom: 10px;
  color: #003184;
  font-size: 24px;
  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

const MapText = styled.h3`
  text-align: center;
  color: #003184;
  font-size: 28px;
  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

const MapContainer = styled.div`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 60px;
  border-radius: 12px;
`;
