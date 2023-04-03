import styled from 'styled-components'

export const HeaderContainer = styled.header`

-webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);

background: #f8f8f8;
position: absolute;
border: 1px solid #f1f1f1;

width: 300px;
height: 200px;
margin-left: 10px;
border-radius: 0 0 25px 25px;
z-index: 100;
display: flex;
align-items: center;
justify-content: center;
`
export const LogoAiko = styled.img`
height: 75px;
position: absolute;
top: 10px;

`
export const Ul = styled.ul`
padding: 15px;
`
export const Li = styled.li`
list-style: none;
margin: 5px;
font-size: 1.3em;
cursor: pointer;
transition: all ease-in 0.2s;

:hover, :active{
    transform: scale(1.05);
    transform: translate(5px , 0);
    color: #424242;
}

& a {
    color: #171717;
    text-decoration: none;
}
`
export const Button = styled.button`
margin-top: 35px;
width: 75%;

font-size: 1.2em;
background: #d1d1d1;
border: 1px solid #f8f8f8;
border-radius: 25px;
cursor: pointer;
transition: all ease-in 0.2s;
color: #003184;
text-decoration: none;
padding: 10px;
    :hover , :active {
        transform: scale(1.1);
        background: #f8f8f8;
        border: 2px solid #003184;
    }

    & a {
            display: block;
            width: 100%;
            height: 100%;
            transition: all ease-in 0.2s;
            color: #003184;
            text-decoration: none;
        }

`
export const Title = styled.h1`
position: absolute;
top: 150px;
font-size: 1.1em;
`
export const BurgerContainer = styled.div`

    position: absolute;
    z-index: 1002;
    left: -15px;
    top: -15px;
    background: #f8f8f8;
    border-radius: 0 0 25px;
    padding: 25px;
    @media screen and (min-width: 480px) {
        display: none;
    }
`