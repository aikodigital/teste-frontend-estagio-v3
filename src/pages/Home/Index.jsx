import FiltersHome from "../../components/FiltersHome/Index";
import 'leaflet/dist/leaflet.css';
import Map from "../../components/Map/Index";
import styles from './Home.module.scss';

export default function Home() {
    
    return (
        <div className={styles.home}>
            <FiltersHome />
            <Map />

        </div>
    )
}