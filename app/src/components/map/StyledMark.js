import styled from 'styled-components'

//DATA
import equipamentState from  '../../../data/equipmentState'
export const StateColor = (lastStateId) => {

    const index = equipamentState.findIndex((i)=> i.id === lastStateId )
    let lastStateColor = equipamentState[index].color
    
    const StateColor = styled.h3`
        font-size: 1.4em;
        color: ${lastStateColor};
    `
    return StateColor
}

export const List = styled.div`
margin: 10px;
height: 150px;
overflow: overlay;
`
export const Ul = styled.ul`
margin: 3px 0;
`
export const ListNome = styled.li`
font-size: 1.1em;
font-weight: bold;
`
export const ListDate = styled.li`
`
export const DivPopup = styled.div`
width: 300px;
`
export const InfoContainer = styled.div`
display: flex;
align-items: center;
& a {
position: relative;
top: 10px;
text-decoration: none;
background: #d1d1d1;
padding: 10px;
border-radius: 50px;
text-transform: capitalize;
font-weight: bold;
box-shadow: black 0 0 0;
-webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
-moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
transition: all ease-in 0.2s;
color: #003184;
cursor: pointer;
}
& a:hover ,a:active {
background: #003184;
color: #ffffff;
transform: scale(1.1);
}
`