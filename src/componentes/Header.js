import "../style/Header.css"
import logo from '../img/logo.png'

function Header() {
    return (
        <div className="--header-container">
            <img className="header--logo" src={logo} alt="website logo" />
        </div>
    );
}
export default Header;