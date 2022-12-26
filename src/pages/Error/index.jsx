//React
import React from 'react';

//Components
import Header from '../../components/Header';
import DisplayError from '../../components/DisplayError';
import Footer from '../../components/Footer'

//CSS
import '../../styles/pages/Error.css';

function Error() {
  return (
    <React.Fragment>
      <Header />
        <main className='main-error'>
          <DisplayError errorCode={"404"} errorMessage={"The requested content does not exist or is no longer available."}/>
        </main>
      <Footer />
    </React.Fragment>
  );
}

export default Error;
