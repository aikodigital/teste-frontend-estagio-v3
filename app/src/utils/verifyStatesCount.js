
import equipmentStateHistory from '../../data/equipmentStateHistory.json'
import equipmentState from '../../data/equipmentState.json'

export default function verifyStatesCount(){
    let Operate = 0 
    let Maintence = 0 
    let Stop = 0 

    let lastStates = Array()
    equipmentStateHistory.map((item) => {
        lastStates.push(item.states.slice(-1))
    })


    lastStates.map((item) => {
        if(item[0].equipmentStateId == equipmentState[0].id){
            Operate++
        }

        if(item[0].equipmentStateId == equipmentState[1].id){
            Stop++
        }

        if(item[0].equipmentStateId == equipmentState[2].id){
            Maintence++
        }

        const P = 0
        const M = 0
    })

    const response = {
        operate: Operate,
        maintence: Maintence,
        stop: Stop
    }

    return response
} 