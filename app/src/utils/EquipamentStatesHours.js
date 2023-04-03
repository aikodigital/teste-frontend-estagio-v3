
import equipmentStateHistory from '../../data/equipmentStateHistory.json'
import { DateTime } from 'luxon'
import { Manutenção } from '../components/dashboard/Styled'

export default function EquipamentStatesHours(id){

    let item = Array()
    item = JSON.parse(JSON.stringify(equipmentStateHistory[equipmentStateHistory.findIndex((i)=> i.equipmentId == id)].states))
    item = item.reverse()

  
    
    let hours = 0
    let index = 0
    let OperateHours = 0
    let StopHours = 0
    let MaintenceHours = 0

    let start = 0
    let end = 0
    let diffInHours = 0

    const CalculateHoursDiff = (index) => {
        start = DateTime.fromISO(item[index].date);
        end = DateTime.fromISO(item[index + 1].date);
        diffInHours = start.diff(end, 'hours');
        
        const response = {
            start: start,
            end: end,
            diffInHours: diffInHours.values.hours
        }

        return response
    }



    while(hours < 24){
        switch(item[index].equipmentStateId){

            case '0808344c-454b-4c36-89e8-d7687e692d57':
                OperateHours = OperateHours + CalculateHoursDiff(index).diffInHours
                hours = hours + diffInHours.values.hours
            break

            case 'baff9783-84e8-4e01-874b-6fd743b875ad':
                hours = hours + CalculateHoursDiff(index).diffInHours
                StopHours = StopHours + CalculateHoursDiff(index).diffInHours
            break

            case '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f':
                hours = hours + CalculateHoursDiff(index).diffInHours
                MaintenceHours = CalculateHoursDiff(index).diffInHours
            break
        }
        index = index +1

    }
    


    const response = {
        id: id,
        operate: {
            hours: OperateHours,
            id: '0808344c-454b-4c36-89e8-d7687e692d57'
        },
        stop: {
            hours: StopHours,
            id: 'baff9783-84e8-4e01-874b-6fd743b875ad'
        },
        maintence: {
            hours: MaintenceHours,
            id: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f'
        }
    }
    return response
}
