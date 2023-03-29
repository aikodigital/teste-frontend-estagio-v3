import EquipamentosDados from '../../data/equipment.json'
import ModeloEquipamentos from '../../data/equipmentModel.json'
import PosicaoDosEquipamentos from '../../data/equipmentPositionHistory.json'
import EstadoEquipamentos from '../../data/equipmentState.json'
import HistEstadoEqupamentos from '../../data/equipmentStateHistory.json'

const fullEquipment = []

  EquipamentosDados.forEach(item => {
    let Equipamentos = {}

    ModeloEquipamentos.forEach(equip => {
      if (item.equipmentModelId === equip.id) {
        Equipamentos = {
          name: item.name,
          modelName: equip.name,
          mostRecentState: {},
          stateData: {},
          id: item.id,
          modelId: item.equipmentModelId,
          location: {},
          historyState: [],
          historyPosicion: []
        }
      }
    })
    HistEstadoEqupamentos.forEach(history => {
      if (history.equipmentId === item.id) {
        Equipamentos.historyState.push(history)
        Equipamentos.mostRecentState = (history.states[history.states.length - 1])
      }
    })

    PosicaoDosEquipamentos.forEach(history => {
      if (history.equipmentId === item.id) {
        Equipamentos.historyPosicion.push(history)
        Equipamentos.location = (history.positions[history.positions.length - 1])
      }
    })

    const mostRecentStateId = Equipamentos.mostRecentState.equipmentStateId

    EstadoEquipamentos.forEach(equipamento => {
      if (equipamento.id === mostRecentStateId) {
        Equipamentos.stateData = equipamento;
      }
    })

    fullEquipment.push(Equipamentos)

    return fullEquipment.values
  })

export default fullEquipment;