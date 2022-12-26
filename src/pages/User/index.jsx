//React
import React from 'react';
import { useEffect } from 'react';

//Redux
import { useSelector } from 'react-redux';

//Selectors Redux
import {isUserLoggedIn, isThereAnError, userData} from '../../utils/selectors';

//React-router
import { useNavigate } from 'react-router-dom';

//Components
import Header from '../../components/Header';
import UserProfileInformation from '../../components/UserProfileInformation';
import Account from '../../components/Account';
import Footer from '../../components/Footer';

//CSS
import '../../styles/pages/User.css';

function User() 
{

  const navigate = useNavigate();

  // Retrieving useful data with selectors
  const loginStatus = useSelector(isUserLoggedIn);
  const errorStatus = useSelector(isThereAnError);
  const user = useSelector(userData);

  // When the user logs out, he's redirected to the login page.
  useEffect(() => {
    if(!loginStatus)
    {
        navigate("/login");
    }
  }, [loginStatus, navigate]);

  if(loginStatus)
  {
    return (
      <React.Fragment>
        <Header loginStatus={loginStatus} user={user}/>
        <main className='main-user'>
          <UserProfileInformation name={user.firstName} lastname={user.lastName} errorStatus={errorStatus}/>
          <h2 className='screen-reader-only'>Accounts</h2>
          <Account title={"Argent bank Checking (x8349)"} amount={"2,082.79"} description={"Available Balance"}/>
          <Account title={"Argent Bank Savings (x6712)"} amount={"10,928.42"} description={"Available Balance"}/>
          <Account title={"Argent Bank Credit Card (x8349)"} amount={"184.30"} description={"Current Balance"}/>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default User;
