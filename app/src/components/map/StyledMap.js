import styled from 'styled-components'

export const Button = styled.button`
position: absolute;
margin: 10px;
z-index: 1001;
padding: 20px;
font-size: 1.2em;
border-radius: 25px;
bottom: 30px;
right: 30px;
background: #f8f8f8;
border: none;
-webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
cursor: pointer;
color: #003184;

transition: all ease-in 0.2s;


display: flex;
align-items: center;
justify-content: center;

:hover , :active {
  transform: scale(1.1);
}

& a{
  color: #003184;
  text-align: center;
  text-decoration: none;
}
& ~ div{
  transform: translate(-325px, 0);
  @media screen and (max-width: 480px) {
        position: absolute;
        z-index: 1000;
        bottom: 90px !important;
        right: -322px !important;
    }
}
`