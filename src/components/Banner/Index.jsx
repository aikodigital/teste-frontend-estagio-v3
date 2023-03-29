import styles from './Banner.module.scss';
import logo from './logo.png';

export default function Banner () {
    return(
        <div className={styles.banner}>
            <div className={styles.banner__logo}>
                <img src={logo} alt='imagem do logo do projeto' /> 
            </div>
        <h1 className={styles.banner__title}>Equipment Searching App </h1>
        </div>

    )
}