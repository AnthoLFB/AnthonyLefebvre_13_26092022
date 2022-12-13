//React
import { useEffect } from 'react';

//Redux
import { useSelector, useStore } from 'react-redux';

//Action Redux
import { getUserProfile, logout } from '../features/user';

//Selectors Redux
import {isUserLoggedIn, userData} from '../utils/selectors';

//Links
import { NavLink } from "react-router-dom";

//Images
import logo from "../assets/images/header/argentBankLogo.png";

//CSS
import '../styles/components/Header.css';

function Header ()
{   
    const store = useStore();
    const loginStatus = useSelector(isUserLoggedIn);
    const user = useSelector(userData);

    useEffect(() => {
        if(loginStatus)
        {
            getUserProfile(localStorage.getItem("jwt"), store);
        }
    }, [loginStatus, store]);

    if(loginStatus && user != null)
    {
        return(
            <header className="header">
                <nav className="header__navbar">
                    <ul className="header__navbar__list">
                        <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/"><img className="header__navbar__list__item__link__image" src={logo} alt="Home page - ArgentBankLogo"/></NavLink></li>                      
                        <div className="header__navbar__list__item__container">
                            <li className="header__navbar__list__item__container__user-info"><NavLink className="header__navbar__list__item__link" to={`/profile`}><i className="fa fa-user-circle"></i> {user.firstName}</NavLink></li>
                            <li className="header__navbar__list__item__container__user-info"><button className='header__navbar__list__item__link header__navbar__list__item__button' onClick={() => logout(store)}>Sign Out</button></li>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    }

    return (
        <header className="header">
            <nav className="header__navbar">
                <ul className="header__navbar__list">
                    <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/"><img className="header__navbar__list__item__link__image" src={logo} alt="Home page - ArgentBankLogo"/></NavLink></li>
                    <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/login"><i className="fa fa-user-circle"></i> Sign In</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header