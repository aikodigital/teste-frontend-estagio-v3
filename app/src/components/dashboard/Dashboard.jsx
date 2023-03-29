//STYLES

import {DashboardContainer, EquipamentCountContainer, EquipamentCountUl, EquipamentCountLi, Operando, Parado, Manutenção   } from './Styled'

//DATA
import equipament from '../../../data/equipment.json'
import equipamentModel from '../../../data/equipmentModel.json'
import verifyStatesCount from '../../utils/verifyStatesCount'

function Dashboard(props){
return(
    <DashboardContainer>

        <EquipamentCountContainer>
            <EquipamentCountUl>
                <EquipamentCountLi>
                    <img src='../../../assets/icons/CA.svg'></img>
                    <h3>{equipament.filter( item => item.equipmentModelId == equipamentModel[0].id) .length}</h3> 
                    <Operando> <span><h3>{verifyStatesCount().operate}</h3></span> Operando</Operando>
                </EquipamentCountLi>
                <EquipamentCountLi>
                    <img src='../../../assets/icons/HA.svg'></img>
                    <h3>{equipament.filter( item => item.equipmentModelId == equipamentModel[1].id) .length}</h3>
                    <Parado>   <span><h3>{verifyStatesCount().stop}</h3></span> Parado</Parado>
                </EquipamentCountLi>
                <EquipamentCountLi>
                    <img src='../../../assets/icons/GT.svg'></img>
                    <h3>{equipament.filter( item => item.equipmentModelId == equipamentModel[2].id) .length}</h3>
                    <Manutenção> <span><h3>{verifyStatesCount().maintence}</h3></span> Manutenção</Manutenção>
                </EquipamentCountLi>
            </EquipamentCountUl>
        </EquipamentCountContainer>

    </DashboardContainer>
)
}export default Dashboard