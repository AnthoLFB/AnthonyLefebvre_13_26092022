//Components
import LoggedInContent from './LoggedInContent';
import LoggedOutContent from './LoggedOutContent';

//CSS
import '../../styles/components/Header.css';

function Header({loginStatus, user})
{   
    return (
        <header className="header">
            {loginStatus && user !=null ? <LoggedInContent user={user} /> : <LoggedOutContent />}
        </header>
    )
}

export default Header