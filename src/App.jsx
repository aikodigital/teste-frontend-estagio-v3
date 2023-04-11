import React from 'react';
import ContextData from './ContextData';
import GlobalStyle from './styles/global';
import styled from 'styled-components';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Equipment from './Components/Equipment';
import Modelo from './Modelo';

const App = () => {
  return (
    <Container>
      <ContextData>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="equipamento/:id" element={<Equipment />} />
          <Route path="modelo/:id" element={<Modelo />} />
        </Routes>
      </ContextData>
    </Container>
  );
};

export default App;

const Container = styled.section`
  min-height: 100vh;
`;
