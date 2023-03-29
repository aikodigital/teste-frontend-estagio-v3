
import { NavLink } from "react-router-dom";
import styles from './ActiveLinks.module.scss';

export default function ActiveLinks({ to, children }) {
    return (
        <li>
            <NavLink to={to}
                className={({ isActive, isPending }) => isPending ? styles.link : isActive ? styles.selectedLink : ""}
            >
            {children}
            </NavLink>
        </li>
    )
}