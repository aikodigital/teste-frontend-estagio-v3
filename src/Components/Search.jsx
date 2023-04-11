import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from '../assets/search.svg';
import { useNavigate } from 'react-router-dom';

const Search = ({ data }) => {
  const [query, setQuery] = useState('');
  const [ativo, setAtivo] = useState(false);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const mostrarModalPesquisa = () => {
    setAtivo((state) => !state);
  };

  const handleClickOutside = ({ target }) => {
    if (ativo) {
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        setAtivo(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const irParaPaginaModelo = (id) => {
    navigate(`modelo/${id}`);
  };

  return (
    <Container ref={dropDownRef}>
      <InputContainer>
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={mostrarModalPesquisa}
        />
        <SearchSVG />
      </InputContainer>

      <List ativo={ativo}>
        {filteredData.map((item) => (
          <ListItem key={item.id} onClick={() => irParaPaginaModelo(item.id)}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  position: relative;
  top: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  svg {
    position: relative;
    top: 2px;
    padding: 0px 5px;
  }
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: none;
  @media (max-width: 560px) {
    width: 200px;
  }
  @media (max-width: 410px) {
    width: 100px;
  }
`;

const List = styled.ul`
  display: ${({ ativo }) => (ativo ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  position: absolute;
  background: #fff;
  margin-top: 60px;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
`;

const ListItem = styled.li`
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #bceeb0;
  }
`;
