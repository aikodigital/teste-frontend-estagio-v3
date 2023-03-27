import equipment from '../data/equipment.json';
import eqModel from '../data/equipmentModel.json';
import eqPositionHistory from '../data/equipmentPositionHistory.json';
import eqState from '../data/equipmentState.json';
import eqStateHistory from '../data/equipmentStateHistory.json';
import moment from 'moment';
moment.locale('pt-br');

console.log(eqState)

const parado = 'baff9783-84e8-4e01-874b-6fd743b875ad'
const manutencao = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f'
const operando = '0808344c-454b-4c36-89e8-d7687e692d57'

class Equipment {

  constructor(name, id, modelId, modelName, positionHistory, stateHistory) {
    this.name = name;
    this.id = id;
    this.modelId = modelId;
    this.modelName = modelName;
    this.positionHistory = positionHistory;
    this.stateHistory = stateHistory;
  }

  showDate(date){
    return moment(date).format("DD/MM/YY [às] HH:mm");
  }

  showState(stateId){
    return eqState.filter(state => state.id === stateId)[0].name;
  }

  lastPosition() {
    const date = this.positionHistory
      .map(position => position.date)
      .reduce((acc, next) => next > acc ? next : acc);
    const position = this.positionHistory
      .filter(position => position.date == date)[0];
    return position;
  }

  findPositionAt(date) {
    const previousDate = this.positionHistory
      .map(position => position.date)
      .reduce((acc, next) => {
        if (date > acc) {
          if (date > next) {
            return next;
          } else {
            return acc;
          }
        }
      });

    const position = this.positionHistory
      .filter(position => position.date == previousDate)[0];
    return position;
  }

  lastState() {
    const date = this.stateHistory
      .map(state => state.date)
      .reduce((acc, next) => next > acc ? next : acc);
    const state = this.stateHistory
      .filter(state => state.date === date)[0];

    return state;
  }


}

const equipments = [];

equipment.forEach(eq => {
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


function findModelName(modelId) {
  const modelName = eqModel.filter(model => model.id == modelId).map(model => model.name)[0];
  return modelName;
}

function findPositionHistory(id) {
  const positions = eqPositionHistory.filter(eq => eq.equipmentId === id).map(eq => eq.positions)[0];
  return positions;
}

function findStateHistory(id) {
  const stateHistory = eqStateHistory.filter(eq => eq.equipmentId === id).map(eq => eq.states)[0];
  stateHistory.forEach(state => state.date = moment(state.date));
  return stateHistory;
}

const descendingOrder = (a, b) =>{
  if(a.date > b.date){
      return -1;
  }
  if(a.date < b.date){
      return 1;
  }
  return 0;
}

const ascendingOrder = (a, b) =>{
  if(a.date < b.date){
      return -1;
  }
  if(a.date > b.date){
      return 1;
  }
  return 0;
}




/* teste */

class Day {
  constructor(day, hoursState = []){
    this.day = day;
    this.hoursState= hoursState;
  }
}

const teste = equipments[0].stateHistory.filter(state => state.date.format('DD') == '28');

const teste2 =  [];

equipments[0].stateHistory
                .sort(ascendingOrder)
                .forEach(state =>{
                  if(teste2.indexOf(state.date.format('DD/MM/YYYY')) == -1){
                    teste2.push(state.date.format('DD/MM/YYYY'));
                  }
                })
                ;

const teste3 = teste2.map(day => {
  return new Day(day);
});


for(let i in equipments[0].stateHistory){
  const SH = equipments[0].stateHistory[i]
  console.log(SH)
  if(teste2.indexOf(SH.date.format('DD/MM/YYYY')) != -1){
    teste3[teste2.indexOf(SH.date.format('DD/MM/YYYY'))].hoursState
    .push({hour: SH.date.format('HH:mm'), state: SH.equipmentStateId == parado? 'parado'
    :SH.equipmentStateId == manutencao? 'manutencao': 'operando'})
  }
}



/* 
teste2
                .forEach(date =>{
                  equipments[0].stateHistory.forEach((state, index) =>{
                    if(state.date.format('DD/MM/YYYY') == date){
                      teste3.push({date: date});

                    }
                  })
                }); */


console.log(teste3);


/* teste */

export {
  equipments,
  eqState,
  descendingOrder
}



