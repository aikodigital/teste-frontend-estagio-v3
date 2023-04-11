import React, { createContext, useEffect, useState } from 'react'

export const EquipamentContext = createContext();
const equipamentoURL = '../src/data/equipment.json';
const equipamentoModeloURL = '../src/data/equipmentModel.json';
const equipamentoPosicaoHistoricoURL = '../src/data/equipmentPositionHistory.json';
const equipamentoEstadoURL = '../src/data/equipmentState.json';
const equipamentoEstadoHistoricoURL = '../src/data/equipmentStateHistory.json';

const ContextData = ({children}) => {
  const [equipamentos, setEquipamentos] = useState(null);
  const [equipamentoModelo, setEquipamentoModelo] = useState(null);
  const [equipamentoPosicaoHistorico, setEquipamentoPosicaoHistorico] = useState(null);
  const [equipamentoEstado, setEquipamentoEstado] = useState(null);
  const [equipamentoEstadoHistorico, setEquipamentoEstadoHistorico] = useState(null);

  const fetchEquipamento = async () => {
    const response = await fetch(equipamentoURL);
    const jsonData = await response.json();
    setEquipamentos(jsonData);
  };

  const fetchEquipamentoModelo = async () => {
    const response = await fetch(equipamentoModeloURL);
    const jsonData = await response.json();
    setEquipamentoModelo(jsonData);
  };

  const fetchEquipamentoPosicaoHistorico = async () => {
    const response = await fetch(equipamentoPosicaoHistoricoURL);
    const jsonData = await response.json();
    setEquipamentoPosicaoHistorico(jsonData);
  };

  const fetchEquipamentoEstado = async () => {
    const response = await fetch(equipamentoEstadoURL);
    const jsonData = await response.json();
    setEquipamentoEstado(jsonData);
  };

  const fetchEquipamentoEstadoHistorico = async () => {
    const response = await fetch(equipamentoEstadoHistoricoURL);
    const jsonData = await response.json();
    setEquipamentoEstadoHistorico(jsonData);
  };

  useEffect(() => {
    fetchEquipamento();
  }, []);

  useEffect(() => {
    fetchEquipamentoModelo();
  }, []);

  useEffect(() => {
    fetchEquipamentoPosicaoHistorico();
  }, []);

  useEffect(() => {
    fetchEquipamentoEstado();
  }, []);

  useEffect(() => {
    fetchEquipamentoEstadoHistorico();
  }, []);

  const dados = {
    equipment: equipamentos,
    equipmentModel: equipamentoModelo,
    equipmentPositionHistory: equipamentoPosicaoHistorico,
    equipmentState: equipamentoEstado,
    equipmentStateHistory: equipamentoEstadoHistorico
  }

  return (
    <EquipamentContext.Provider value={dados}>
      {children}
    </EquipamentContext.Provider>
  )
}

export default ContextData