//React
import React from 'react';

//Redux
import { useSelector } from 'react-redux'

//Selectors Redux
import {isUserLoggedIn, userData} from '../../utils/selectors';

//Components
import Header from '../../components/Header';
import DisplayError from '../../components/DisplayError';
import Footer from '../../components/Footer'

//CSS
import '../../styles/pages/Error.css';

function Error() 
{
  const loginStatus = useSelector(isUserLoggedIn);
  const user = useSelector(userData);
  
  return (
    <React.Fragment>
      <Header loginStatus={loginStatus} user={user}/>
        <main className='main-error'>
          <DisplayError errorCode={"404"} errorMessage={"The requested content does not exist or is no longer available."}/>
        </main>
      <Footer />
    </React.Fragment>
  );
}

export default Error;
