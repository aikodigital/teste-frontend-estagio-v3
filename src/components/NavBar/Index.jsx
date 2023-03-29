import ActiveLinks from './ActiveLinks/Index';
import styles from './NavBar.module.scss';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__list}>
                   <ActiveLinks to="/"> Home</ActiveLinks>
                   <ActiveLinks to='/equipmentHistory'> Histórico de equipamentos </ActiveLinks>
            </ul>
        </nav>
    )
}