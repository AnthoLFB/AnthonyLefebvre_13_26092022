//React
import React from 'react';

//React
import { useEffect } from 'react';

//Redux
import { useSelector, useStore } from 'react-redux'

//Action Redux
import { getUserProfile } from '../../features/user';

//React-router
import { useNavigate } from 'react-router-dom';

//Selectors Redux
import {isUserLoggedIn, isThereAnError, userData} from '../../utils/selectors';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';

//CSS
import '../../styles/pages/Login.css';

function Login() 
{

  const store = useStore();
  const navigate = useNavigate();

  // Retrieving useful data with selectors
  const loginStatus = useSelector(isUserLoggedIn);
  const errorStatus = useSelector(isThereAnError);
  const user = useSelector(userData);


  useEffect(() => {
    // If the user is logged in, no errors from the API are returned and the user's data has not yet been retrieved then it is retrieved.
    if(loginStatus && !errorStatus && user == null)
    {
      getUserProfile(localStorage.getItem("jwt"), store);
    }
    // If the user is logged in, no errors from the API are returned and the user's data has been retrieved then the user is redirected to their profile page.
    else if(loginStatus && !errorStatus && user != null)
    {
      navigate("/profile");
    }
  }, [loginStatus, errorStatus, user, store, navigate]);

  return (
    <React.Fragment>
      <Header loginStatus={loginStatus} user={user}/>
      <main className='main-login'>
        <h1 className='screen-reader-only'>Login Form</h1>
        <LoginForm errorStatus={errorStatus}/>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Login;