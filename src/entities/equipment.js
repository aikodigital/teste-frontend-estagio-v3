import equipment from '../data/equipment.json';
import eqModel from '../data/equipmentModel.json';
import eqPositionHistory from '../data/equipmentPositionHistory.json';
import eqState from '../data/equipmentState.json';
import eqStateHistory from '../data/equipmentStateHistory.json';
import moment from 'moment';
moment.locale('pt-br');

const parado = 'baff9783-84e8-4e01-874b-6fd743b875ad'
const manutencao = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f'
const operando = '0808344c-454b-4c36-89e8-d7687e692d57'

class Equipment {

  constructor(name, id, modelId, modelName, hourlyEarnings, positionHistory, stateHistory) {
    this.name = name;
    this.id = id;
    this.modelId = modelId;
    this.modelName = modelName;
    this.hourlyEarnings = hourlyEarnings;
    this.positionHistory = positionHistory;
    this.stateHistory = stateHistory;
    this.dayStatesTotal = calcHourStates(stateHistory);
    /* this.hoursStateHistory =  */
  }

  showDate(date) {
    return moment(date).format("DD/MM/YY [às] HH:mm");
  }

  showState(stateId) {
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

  /* função a ser implementada para fazer histórico das posições */
  /* findPositionAt(date) {
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
  } */

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
      findModelNameAndEarning(eq.equipmentModelId)[0],
      findModelNameAndEarning(eq.equipmentModelId)[1],
      findPositionHistory(eq.id),
      findStateHistory(eq.id)
    ))
})


function findModelNameAndEarning(modelId) {
  const modelName = eqModel.filter(model => model.id == modelId).map(model => model.name)[0];
  const hourlyEarnings = eqModel
    .filter(model => model.id == modelId)
    .map(model => model.hourlyEarnings)[0];

    const earnings = {operando: 0, manutencao: 0, parado: 0}

    hourlyEarnings.forEach(he => {
        if (he.equipmentStateId === operando){
          earnings.operando = he.value
        }
        if (he.equipmentStateId === manutencao){
          earnings.manutencao = he.value
        }
        if (he.equipmentStateId === parado){
          earnings.parado = he.value
        }
      })
    

  return [modelName, earnings];
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

function descendingOrder(a, b){
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

function ascendingOrder(a, b){
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}


function calcHourStates(stateHistory) {

  class Day {

    constructor(day, hoursState = []) {
      this.day = day;
      this.hoursState = hoursState;
      this.dayHours = [];
    }
    operatingHours(lastState = 'parado') {
      for (let i = 0; i < 24; i++) {
        this.dayHours.push({ hour: `${i < 10 ? '0' + i : i}:00` })
      }
      this.hoursState.forEach((sh) => {
        if (this.dayHours.map(h => h.hour).indexOf(sh.hour) != -1) {
          this.dayHours[this.dayHours.map(h => h.hour).indexOf(sh.hour)].state = sh.state;
        }
      })
  
      this.dayHours.forEach((hour, index) => {
        if (index == 0 && !hour.state) {
          hour.state = lastState;
        }
  
        if (!hour.state && index > 0) {
          hour.state = this.dayHours[index - 1].state;
        }
      })
    }
  }

  const stateHistory2 = [];

  stateHistory
    .sort(ascendingOrder)
    .forEach(state => {
      if (stateHistory2.indexOf(state.date.format('DD/MM/YYYY')) == -1) {
        stateHistory2.push(state.date.format('DD/MM/YYYY'));
      }
    })
    ;

  const stateHistory3 = stateHistory2.map(day => {
    return new Day(day);
  });


  for (let i in stateHistory) {
    const SH = stateHistory[i]
    if (stateHistory2.indexOf(SH.date.format('DD/MM/YYYY')) != -1) {
      stateHistory3[stateHistory2.indexOf(SH.date.format('DD/MM/YYYY'))].hoursState
        .push({
          hour: SH.date.format('HH:mm'), state: SH.equipmentStateId == parado ? 'parado'
            : SH.equipmentStateId == manutencao ? 'manutencao' : 'operando'
        })
    }
  }

  for (let i in stateHistory3) {
    const lastState = i > 0 ? stateHistory3[i - 1].hoursState[stateHistory3[i - 1].hoursState.length - 1].state : 'parado';
    stateHistory3[i].operatingHours(lastState);
  }

  function countStatesHour(day) {

    const totalStates = day
      .map(hour => hour.state)
      .flatMap(state => state);

    let totalParado = 0;
    let totalManutencao = 0;
    let totalOperando = 0;

    totalStates.forEach(state => {
      if (state === 'parado') {
        totalParado += 1;
      }
      if (state === 'manutencao') {
        totalManutencao += 1;
      }
      if (state === 'operando') {
        totalOperando += 1;
      }
    })

    return { totalParado: totalParado, totalManutencao: totalManutencao, totalOperando: totalOperando }
  }

  const dayStatesTotal = []

  stateHistory3.forEach(day =>{
    dayStatesTotal.push({day: day.day, stateHours: countStatesHour(day.dayHours)});
  })

  return dayStatesTotal;

}



export {
  equipments,
  eqState,
  descendingOrder
}



