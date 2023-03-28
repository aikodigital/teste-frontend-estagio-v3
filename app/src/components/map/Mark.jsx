//STYLES
import styled from 'styled-components'
import {List, StateColor, Ul, ListNome, ListDate, DivPopup, InfoContainer } from './StyledMark'

//HOOKS
import { useState } from 'react'

//Leaft
import { Marker, Popup } from 'react-leaflet'

//DATA
import equipamentState from '../../../data/equipmentState.json'
import equipmentStateHistory from '../../../data/equipmentStateHistory.json'

//ROUTER
import { Link } from 'react-router-dom'


//LIBS
import uuid from 'react-uuid'

function Mark(props){


    //Default Values
    let indexEquipmentStateHistory = 0

    //Styled Component
    const StateColorStyle = StateColor(props.lastStateId)

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
            </DivPopup>
        </Popup>
    </Marker>  
)
}export default Mark