//React
import React from 'react';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';

//CSS
import '../../styles/pages/Login.css';

function Login() {
  return (
    <React.Fragment>
      <Header />
      <main className='main-login'>
        <h1 className='screen-reader-only'>Login Form</h1>
        <LoginForm />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Login;