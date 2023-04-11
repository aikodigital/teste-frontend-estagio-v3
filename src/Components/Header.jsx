import React, { useContext } from 'react';
import styled from 'styled-components';
import LogoImg from '../assets/aiko.png';
import Search from './Search';
import { EquipamentContext } from '../ContextData';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dados = useContext(EquipamentContext);
  const navigate = useNavigate();
  if (!dados.equipmentModel) return null;

  const equipamentos = dados.equipmentModel.map(({ id, name }) => {
    return { id, name };
  });

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>
        <img src={LogoImg} alt="Logo" />
      </Logo>
      <Search data={equipamentos} />
    </Container>
  );
};

export default Header;

const Container = styled.header`
  border-bottom: 1px solid #cec2c2;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  @media (max-width: 560px) {
    gap: 20px;
  }
`;

const Logo = styled.div`
  height: 50px;
  cursor: pointer;
`;
