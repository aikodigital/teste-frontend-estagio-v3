import Equipamento from "./components/Equipamento";
import equipment from "./data/equipment.json";

import styled from "styled-components";

import logo from "./assets/aiko.png";

export default function App() {
  return (
    <AppContainer>
      <a href="https://aiko.digital">
        <img alt="aiko-logo" src={logo} />
      </a>
      <EquipmentsContainer>
        {equipment.map((e) => (
          <Equipamento
            key={e.id}
            eqID={e.id}
            modelID={e.equipmentModelId}
            name={e.name}
          />
        ))}
      </EquipmentsContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: #003184;
  img {
    width: 260px;
    height: 129px;
  }
  @media (max-width: 768px) {
    img {
      width: 180px;
      height: 90px;
    }
  }
`;

const EquipmentsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  column-gap: 100px;
  row-gap: 100px;
  flex-wrap: wrap;
`;
