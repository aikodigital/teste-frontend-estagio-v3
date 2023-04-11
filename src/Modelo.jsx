import React, { useContext } from 'react';
import styled from 'styled-components';
import { EquipamentContext } from './ContextData';
import { useNavigate, useParams } from 'react-router-dom';
import caminhaoIMG from './assets/caminhao_de_carga.jpg';
import harvesterIMG from './assets/harvester.jpg';
import garraTracadoraIMG from './assets/garra_tracadora.jpg';

const defineIMG = (id) => {
  if (id === 'a3540227-2f0e-4362-9517-92f41dabbfdf') {
    return caminhaoIMG;
  }
  if (id === 'a4b0c114-acd8-4151-9449-7d12ab9bf40f') {
    return harvesterIMG;
  }
  if (id === '9c3d009e-0d42-4a6e-9036-193e9bca3199') {
    return garraTracadoraIMG;
  } else 'Modelo não encontrado';
};

const Modelo = () => {
  const dados = useContext(EquipamentContext);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!dados.equipmentModel || !dados.equipment) {
    return null;
  }

  const modelo = dados.equipmentModel.find((item) => item.id === id);

  const equipamentosDoModelo = dados.equipment.filter(
    ({ equipmentModelId }) => {
      return equipmentModelId === id;
    }
  );

  const irParaPaginaEquipment = (id) => {
    navigate(`/equipamento/${id}`);
  };

  return (
    <Container>
      <Title>
        Modelo: <span>{modelo.name}</span>
      </Title>
      <Lista>
        {equipamentosDoModelo.map(({ name, id }) => (
          <Equipamento key={id} onClick={() => irParaPaginaEquipment(id)}>
            <EquipamentoHeader>
              <EquipamentoNome>
                <p>{name}</p>
              </EquipamentoNome>
              <ImagemContainer>
                <img src={defineIMG(modelo.id)} alt="" />
              </ImagemContainer>
            </EquipamentoHeader>

            <EquipamentoDescricao>
              Aiko + INFLOR: juntos por uma gestão florestal mais eficiente
              Saiba como a integração entre Aiko e INFLOR permite a redução do
              tempo de envio da informação do planejamento ao campo, aumento da
              eficiência e agilidade nos processos, de forma simples e
              intuitiva.
              <Lucro>
                Lucro por hora:
                <span>{modelo.hourlyEarnings[0].value}</span>
              </Lucro>
            </EquipamentoDescricao>
            <Detail />
          </Equipamento>
        ))}
      </Lista>
    </Container>
  );
};

export default Modelo;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  margin-top: 20px;
  span {
    color: rgb(0, 94, 216);
  }
`;

const Lista = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 60px;
`;

const Detail = styled.div`
  height: 12px;
  background: rgb(238, 238, 238);
  transition: 0.5s;
`;

const EquipamentoNome = styled.div`
  text-align: center;
  font-weight: bold;
  background: rgb(238, 238, 238);
  color: #f47521;
  padding: 0.5rem 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  transition: 0.5s;
`;

const Equipamento = styled.li`
  max-width: 348px;
  cursor: pointer;
  &:hover {
    ${EquipamentoNome} {
      background: #f47521;
      color: rgb(238, 238, 238);
    }
    ${Detail} {
      background: #f47521;
    }
  }
`;

const EquipamentoHeader = styled.div``;

const ImagemContainer = styled.div`
  height: 215px;
  background: #bfe4bf;
  margin-bottom: 20px;
  img {
    height: 100%;
    width: 100%;
  }
`;

const EquipamentoDescricao = styled.div`
  margin-bottom: 20px;
`;

const Lucro = styled.p`
  margin-top: 10px;
  span {
    color: #f47521;
    font-weight: bold;
    font-size: 16px;
    margin-left: 5px;
  }
`;
