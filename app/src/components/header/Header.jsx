//STYLES
import './Styles.css'
import { HeaderContainer, LogoAiko, Ul, Li, Button, Title, BurgerContainer} from './StyledHeader'
import Logo from '../../../../img/aiko.png'
import Hamburger from 'hamburger-react'

//HOOKS
import { useState } from 'react'

//ROUTER
import { Link } from 'react-router-dom'

//DATA
import equipment from '../../../data/equipment.json'
import equipmentModel from '../../../data/equipmentModel.json'

function Header(){

    const [menu, setMenu] = useState(false)
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setOpen] = useState(true)


    const mountedStyle = {
        animation: "inAnimation 250ms ease-in"
    }

    const unmountedStyle = {
        animation: "outAnimation 270ms ease-out",
        animationFillMode: "forwards"
    }

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
                <LogoAiko draggable={false} src={Logo} alt='Logomarca'/>

                <Button onClick={()=>{ setMenu(!menu); setIsMounted(!isMounted) }}>Menu</Button>

                <Title>FMP - Forest Monitoring Panel</Title>
                
                    {menu && 
                        <div
                            className="Lista"
                            style={isMounted ? mountedStyle : unmountedStyle}
                            onAnimationEnd={() => { if (!isMounted) setShowDiv(false);}}
                        >
                            <Ul>
                                {equipment.map((element)=>{

                                    const modelIndex = equipmentModel.findIndex((i) => i.id === element.equipmentModelId)
                                    const name = equipmentModel[modelIndex].name
                                    
                                    return(
                                            <Li key={element.id}>
                                                <Link 
                                                    to={`/map/${element.id}`} 
                                                >{element.name} | {name}</Link>
                                            </Li>
                                    )
                                })}
                            </Ul>
                        </div>
                    }
            </HeaderContainer>
        }
    </>   
)
}export default Header
