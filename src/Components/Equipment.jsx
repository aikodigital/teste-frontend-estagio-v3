import React, { useContext } from 'react';
import { EquipamentContext } from '../ContextData';
import { useParams } from 'react-router-dom';
import Historico from './Historico';
import styled from 'styled-components';

const Equipment = () => {
  const dados = useContext(EquipamentContext);
  const { id } = useParams();

  if (!dados.equipmentStateHistory) {
    return null;
  }

  const data = dados.equipmentStateHistory.find(
    ({ equipmentId }) => equipmentId === id
  );
  const days = {};

  // percorre o array "states" e insere cada objeto em seu respectivo dia
  data.states.forEach((obj) => {
    const date = new Date(obj.date);
    const day = date.toISOString().slice(0, 10);
    if (!days[day]) {
      days[day] = [];
    }
    days[day].push(obj);
  });

  return (
    <Container>
      <Historico dias={days} />
    </Container>
  );
};

export default Equipment;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const dias = {
  '2021-02-01': [
    { date: '2021-02-01T03:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-01T07:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-01T12:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-01T15:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-01T17:00:00.000Z', equipmentStateId: 'Operando' },
  ],
  '2021-02-01': [
    { date: '2021-02-02T03:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-02T08:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-02T11:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-02T15:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-02T16:00:00.000Z', equipmentStateId: 'Operando' },
  ],
  '2021-02-01': [
    { date: '2021-02-03T02:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-03T04:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-03T14:00:00.000Z', equipmentStateId: 'Manutenção' },
    { date: '2021-02-03T19:00:00.000Z', equipmentStateId: 'Parado' },
    { date: '2021-02-03T21:00:00.000Z', equipmentStateId: 'Operando' },
  ],
};
