//React
import React from 'react';

//React
import { useEffect } from 'react';

//Redux
import { useSelector } from 'react-redux'

//React-router
import { useNavigate } from 'react-router-dom';

//Selectors Redux
import {isUserLoggedIn, isThereAnError} from '../../utils/selectors';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';

//CSS
import '../../styles/pages/Login.css';

function Login() 
{
  // Information retrieval using selectors.
  const loginStatus = useSelector(isUserLoggedIn);
  const errorStatus = useSelector(isThereAnError);
  const navigate = useNavigate();

  // Redirects the user if they are logged in and no errors from the API are returned
  useEffect(() => {
      if(loginStatus && errorStatus == null)
      {
          navigate("/profile");
      }
    }, [loginStatus, errorStatus, navigate]);

  return (
    <React.Fragment>
      <Header />
      <main className='main-login'>
        <h1 className='screen-reader-only'>Login Form</h1>
        <LoginForm errorStatus={errorStatus}/>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Login;