import styled from 'styled-components'

export const DashboardContainer = styled.div`
    background: #f8f8f8;
    width: 400px;
    height: 200px;
    position: absolute;
    z-index: 9999;
    bottom: 20px;
    right: 0;
    border-radius: 50px 0 0 50px;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px) {
        display: none;
    }

`
export const EquipamentCountContainer = styled.div`

`
export const EquipamentCountUl = styled.ul`
    list-style: none;
    display: flex;
`
export const EquipamentCountLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    & img{
        border-radius: 50px;
        width: 75px;
        height: 75px;
        padding: 10px;
        -webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    }
    & h3 {
        font-size: 1.5em;
    }


`
export const Operando = styled.h2`
    color: #2ecc71;
    & h3{
        text-align: center;
        font-size: 1em;
    }
`
export const Parado = styled.h2`
    color: #f1c40f;
    & h3{
        text-align: center;
        font-size: 1em;
    }
`
export const Manutenção = styled.h2`
    color: #e74c3c;
        & h3{
        text-align: center;
        font-size: 1em;
    }
`