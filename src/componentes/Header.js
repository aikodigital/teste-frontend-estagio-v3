 
 import "./Header.css"; 
 import logo from "./aiko.png";
 
 function Header(){
    return(
      <header className="cabecalho">
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>       
      </header>
    )
}

export default Header;