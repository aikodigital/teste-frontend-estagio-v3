import equipment from '../data/equipment.json';
import eqModel from '../data/equipmentModel.json';
import eqPositionHistory from '../data/equipmentPositionHistory.json';
import eqState from '../data/equipmentState.json';
import eqStateHistory from '../data/equipmentStateHistory.json';

  class Equipment{

    constructor(name, id, modelId, modelName, positionHistory, stateHistory){
      this.name = name;
      this.id = id;
      this.modelId = modelId;
      this.modelName = modelName;
      this.positionHistory = positionHistory;
      this.stateHistory = stateHistory;
    }

    lastPosition(){
      const date =  this.positionHistory
                    .map(position => position.date)
                    .reduce((acc, next) => next > acc? next : acc);
      const position =  this.positionHistory
                        .filter(position => position.date == date)[0];
      return position;
    }

    lastState(){
      const date =  this.stateHistory
                    .map(state => state.date)
                    .reduce((acc, next) => next > acc? next : acc);
      const state = this.stateHistory
      .filter(state => state.date === date)[0];

      return state;
    }

  }

  const equipments = [];

  equipment.forEach( eq =>{
    equipments.push(
        new Equipment(
            eq.name, 
            eq.id, 
            eq.equipmentModelId, 
            findModelName(eq.equipmentModelId),
            findPositionHistory(eq.id),
            findStateHistory(eq.id)
            ))
  })

  
  function findModelName(modelId){
    const modelName =  eqModel.filter(model => model.id == modelId).map(model => model.name)[0];
    return modelName;
  }

  function findPositionHistory(id){
    const positions = eqPositionHistory.filter(eq => eq.equipmentId === id).map(eq => eq.positions)[0];
    return positions;
  }

  function findStateHistory(id){
    const stateHistory = eqStateHistory.filter(eq => eq.equipmentId === id).map(eq => eq.states)[0];
    return stateHistory;
  }

  export {
    equipments,
    eqState
  }



