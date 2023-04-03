//STYLES
import {BurgerContainer, HeaderContainer, LogoAiko, Button, Title} from './StyledHeader'
import Logo from '../../../public/assets/aiko.png'
import Hamburger from 'hamburger-react'

//ROUTER
import { Link } from 'react-router-dom'

//HOOKS
import { useState } from 'react'

function Header(){

    const [isOpen, setOpen] = useState(true)
    window.addEventListener('resize', () => {
        if(window.innerWidth > 480){
            setOpen(true)
        }
    })
    
return(

    <>
        <BurgerContainer>
            <Hamburger toggled={isOpen} toggle={setOpen}/>
        </BurgerContainer>
        {isOpen &&
            <HeaderContainer>
                <LogoAiko draggable={false} src={Logo}/>
                <Button>
                    <Link to={`/`}>Mapa Inicial</Link>
                </Button>
                <Title>FMP - Forest Monitoring Panel</Title>
            </HeaderContainer>
        }
    </>
)
}export default Header
