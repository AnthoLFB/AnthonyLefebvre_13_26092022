//Links
import { NavLink } from "react-router-dom";

//Images
import logo from "../assets/images/header/argentBankLogo.png";

//CSS
import '../styles/components/Header.css';

function Header ({isLoggedIn, userName, userId})
{   
    //Temporary use before importing redux states
    isLoggedIn = false;
    userName = "Tony";
    userId = 1;

    if(isLoggedIn)
    {
        return(
            <header className="header">
                <nav className="header__navbar">
                    <ul className="header__navbar__list">
                        <li className="header__navbar__list__item"><NavLink className="header__navbar__list__item__link" to="/"><img className="header__navbar__list__item__link__image" src={logo} alt="Home page - ArgentBankLogo"/></NavLink></li>                      
                        <div className="header__navbar__list__item__container">
                            <li className="header__navbar__list__item__container__user-info"><NavLink className="header__navbar__list__item__link" to={`/user/${userId}`}><i className="fa fa-user-circle"></i> {userName}</NavLink></li>
                            <li className="header__navbar__list__item__container__user-info"><NavLink className="header__navbar__list__item__link" to="/"><i className="fa fa-sign-out"></i> Sign Out</NavLink></li>
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