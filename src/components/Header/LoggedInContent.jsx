//Redux
import { useStore } from 'react-redux';

//Action Redux
import { logout } from '../../features/user';

//Links
import { NavLink } from "react-router-dom";

//Images
import logo from "../../assets/images/header/argentBankLogo.png";

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';



function LoggedInContent({user})
{
    const store = useStore();
     
    //Font Awesome Icon
    const userIcon = <FontAwesomeIcon icon={faCircleUser}/>
    const signOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

    return (
        <nav className="header__navbar">
            <ul className="header__navbar__list">
                <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/"><img className="header__navbar__list__item__link__image" src={logo} alt="Home page - ArgentBankLogo"/></NavLink></li>                      
                <div className="header__navbar__list__item__container">
                    <li className="header__navbar__list__item__container__user-info"><NavLink className="header__navbar__list__item__link" to={`/profile`}>{userIcon} {user.firstName}</NavLink></li>
                    <li className="header__navbar__list__item__container__user-info"><button className='header__navbar__list__item__link header__navbar__list__item__button' onClick={() => logout(store)}>{signOutIcon} Sign Out</button></li>
                </div>
            </ul>
        </nav>
    )
}

export default LoggedInContent;