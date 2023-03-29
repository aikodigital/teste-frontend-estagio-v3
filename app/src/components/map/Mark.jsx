//STYLES
import styled from 'styled-components'
import {List, StateColor, Ul, ListNome, ListDate, DivPopup, InfoContainer, DivPopup2 } from './StyledMark'

//HOOKS
import { useState } from 'react'

//Leaft
import { Marker, Popup } from 'react-leaflet'

//DATA
import equipamentState from '../../../data/equipmentState.json'
import equipmentStateHistory from '../../../data/equipmentStateHistory.json'
import equipamentModel from '../../../data/equipmentModel.json'

//ROUTER
import { Link } from 'react-router-dom'


//LIBS
import uuid from 'react-uuid'

function Mark(props){


    //Default Values
    let indexEquipmentStateHistory = 0

    //Styled Component
    const StateColorStyle = StateColor(props.lastStateId)

    const production = props.statesHours.operate.hours / (props.statesHours.operate.hours + props.statesHours.stop.hours + props.statesHours.maintence.hours) * 100

    const equipamentModelIndex = equipamentModel.findIndex((i)=> i.id == props.modelId)
    const model = equipamentModel[equipamentModelIndex]

    const gain = (props.statesHours.operate.hours * model.hourlyEarnings[0].value) + (props.statesHours.stop.hours * model.hourlyEarnings[1].value) + (props.statesHours.maintence.hours * model.hourlyEarnings[2].value) 

return(

    <Marker position={[props.lat, props.lon]}
            eventHandlers={{
                click: () => {
                    const indexEquipmentStateHistory = equipmentStateHistory.findIndex((i)=> i.equipmentId == props.id )
                },
            }}
            icon={props.icon}
        >
        <Popup>
            <DivPopup>
                    <DivPopup2>
                        <InfoContainer>
                            
                            <div>
                                <h1>{props.name}</h1>
                                <h2>{props.subName}</h2>
                                <StateColorStyle>{props.lastState}</StateColorStyle>
                                <h4>{props.lastStateDate.slice(0, -8).replace("T", " | ")}</h4>
                            </div>

                            <Link to={`/map/${props.id}`}>Detalhes</Link>

                        </InfoContainer>
                        <List>
                            {   

                                equipmentStateHistory[indexEquipmentStateHistory].states.map((element)=>{

                                    const index = equipamentState.findIndex((i)=> i.id === element.equipmentStateId )

                                    return(
                                            <Ul key={uuid()}>
                                                <ListNome>{equipamentState[index].name}</ListNome> <ListDate>{element.date.slice(0, -8).replace("T", " | ")}</ListDate>
                                            </Ul>
                                    )
                                })
                            }
                        </List>
                    </DivPopup2>
                            --
                    <DivPopup2>
                            <h3>Produtividade do dia: {production.toFixed()}%</h3>
                            <h3>Ganho do dia: R${gain}</h3>
                    </DivPopup2>

            </DivPopup>
        </Popup>
    </Marker>  
)
}export default Mark