import React from "react";
import equimentoModel from './data/equipmentModel.json';

function Produtiv(props) {
    var totalTime=0, operativeTime=0, stopTime=0, maintenanceTime =0;
    const datas = Object.keys(props.allStates)
    const idsStates = Object.keys(props.equipmentStateNames)
    
    for (let i=1;i < datas.length; i++) {
        if (props.allStates[datas[i-1]] === idsStates[0]) {
            operativeTime = operativeTime + (new Date(datas[i]) - new Date(datas[i-1]))/(1000 * 60 * 60);
            totalTime = totalTime + (new Date(datas[i]) - new Date(datas[i-1]))/(1000 * 60 * 60);
        } else if (props.allStates[datas[i]] === idsStates[1]) {
            stopTime = stopTime + (new Date(datas[i])- new Date(datas[i-1]))/(1000 * 60 * 60);
            totalTime = totalTime + (new Date(datas[i])- new Date(datas[i-1]))/(1000 * 60 * 60);
        } else {
            maintenanceTime = maintenanceTime + (new Date(datas[i])- new Date(datas[i-1]))/(1000 * 60 * 60);
            totalTime = totalTime + (new Date(datas[i])- new Date(datas[i-1]))/(1000 * 60 * 60);
        }      
    }
    var proutividade = operativeTime/totalTime*100;
    
    const allValues = {}; 
    equimentoModel.forEach((s) => {
        if (s.id === props.equipmentModelId) {
            s.hourlyEarnings.forEach((values) => {    
                    allValues[values.equipmentStateId] = values.value;   
            });
        }
    });
    var ganho = operativeTime*allValues[idsStates[0]]+stopTime*allValues[idsStates[1]]+maintenanceTime*allValues[idsStates[2]];
    return(
        <table>
            <thead>
                <tr>
                    <th>Percentual de Produtividade</th>
                    <th>Ganho</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{textAlign: 'right'}}>{proutividade.toFixed(2)}%</td>
                    <td style={{textAlign: 'right'}}>R${ganho.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        
    )
}
export default Produtiv;