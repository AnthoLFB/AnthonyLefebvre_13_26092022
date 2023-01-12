//Links
import { NavLink } from "react-router-dom";

//Images
import logo from "../../assets/images/header/argentBankLogo.png";

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function LoggedOutContent()
{

    //Font Awesome Icon
    const userIcon = <FontAwesomeIcon icon={faCircleUser}/>

    return (
        <nav className="header__navbar">
            <ul className="header__navbar__list">
                <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/"><img className="header__navbar__list__item__link__image" src={logo} alt="Home page - ArgentBankLogo"/></NavLink></li>
                <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/login">{userIcon} Sign In</NavLink></li>
            </ul>
        </nav>
    )
}

export default LoggedOutContent;