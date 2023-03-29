import style from './Footer.module.scss';
import linkIcon from './linkIcon.png';
import gitIcon from './gitIcon.png';

export default function Footer () {
    return(
        <footer className={style.footer}>
            <div className={style.footer__images}>
                <a href="https://www.linkedin.com/in/henrique-alexandre-gomes-pinto-6b555423b/"> <img src={linkIcon} alt='icone do Linkdin' /> </a>
                <a href="https://github.com/HenriqueAgp?tab=repositories"> <img src={gitIcon} alt='icone do Linkdin' /> </a> 
            </div>
            <div>
                &copy; Produzido Por Henrique Alexandre Gomes Pinto
            </div>
        </footer>
    )
}