let state;
let equipment;
let model;
let stateHistory;
let positionHistory;

//funções para puxar e guardar os dados do banco de dados
const getStates = async () => {
    
    const stateResponse = await fetch('./data/equipmentState.json').then(response =>  response) 
    const stateData = await stateResponse.json().then(data => state = data)
    return
}   

const getEquipment = async () => {
    const stateResponse = await fetch('./data/equipment.json').then(response =>  response) 
    const stateData = await stateResponse.json().then(data => equipment = data)
}

const getEquipmentModel = async () => {
    const stateResponse = await fetch('./data/equipmentModel.json').then(response =>  response) 
    const stateData = await stateResponse.json().then(data => model = data)
}

const getStatesHistory = async () => {
    const stateResponse = await fetch('./data/equipmentStateHistory.json').then(response =>  response) 
    const stateData = await stateResponse.json().then(data => stateHistory = data)
}

const getPositionHistory = async () => {
    const stateResponse = await fetch('./data/equipmentPositionHistory.json').then(response =>  response) 
    const stateData = await stateResponse.json().then(data => positionHistory = data)
}

//Layout backup do objeto contendo os elements
// {
//     name: '',
//     modelName: '',
//     state: '',
//     id: 0,
//     modelId: 0,
//     location: {
//         lat: 0,
//         long: 0,
//         },
//     history: {
//         locationHistory: [],
//         locationState: [],
//     }    
// }



const ramdomStateNumber = () => Math.floor(Math.random() * 3)

// função que retorna um array com todos os equipamentos e suas propriedades organizadas e agrupadas
const createElementsGroup = async () => {
    await getStates()
    await getEquipment()
    await getEquipmentModel()
    await getPositionHistory()
    await getStatesHistory()
    const equipments = []

    equipment.forEach(item => {
        let equipment = {} 

        model.forEach(equip => {
            if(item.equipmentModelId === equip.id){
                equipment = {
                    name: item.name,
                    modelName: equip.name,
                    state: state[ramdomStateNumber()],
                    id: item.id,
                    modelId: item.equipmentModelId,
                    location: {
                        lat: 0,
                        long: 0,
                        },
                        history: []
                } 
            }  
        })
        
        stateHistory.forEach(history => {
            if (history.equipmentId === item.id) {
                equipment.history.push(history)
            }
        })

        positionHistory.forEach((history, i) => {
            if (history.equipmentId === item.id) {
                equipment.history.push(history)
                equipment.location.lat = positionHistory[i].positions[0].lat
                equipment.location.long = positionHistory[i].positions[0].lon
            }
        })

        equipments.push(equipment)
    })
    return equipments
}

export default createElementsGroup