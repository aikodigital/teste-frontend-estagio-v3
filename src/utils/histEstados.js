import fullEquipment from "./obterDados"

const histStates = []

  fullEquipment.forEach(equipamento => {
    let estado = {
      name: equipamento.name,
      id: equipamento.id,
      historyStates: {}
    }

    estado.historyStates = (equipamento.historyState[0].states)

    estado.historyStates.forEach(state => {
      let status

      if(state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
        status = 'Operando'
      } 
      else if(state.equipmentStateId === 'baff9783-84e8-4e01-874b-6fd743b875ad') {
        status = 'Parado'
      } else {
        status = 'Manutenção'
      } 

      return state.status = status
    })

    histStates.push(estado)

    return histStates
  })

export default histStates;