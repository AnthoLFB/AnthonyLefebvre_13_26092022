//React
import React from 'react';

//Components
import Header from '../../components/Header';
import Account from '../../components/Account';
import Footer from '../../components/Footer';

//CSS
import '../../styles/pages/User.css';
import UserProfileInformation from '../../components/UserProfileInformation';

function User() {
  return (
    <React.Fragment>
      <Header />
      <main className='main-user'>
        <UserProfileInformation name={"Antho"} lastname={"LFB"}/>
        <h2 className='screen-reader-only'>Accounts</h2>
        <Account title={"Argent bank Checking (x8349)"} amount={"2,082.79"} description={"Available Balance"}/>
        <Account title={"Argent Bank Savings (x6712)"} amount={"10,928.42"} description={"Available Balance"}/>
        <Account title={"Argent Bank Credit Card (x8349)"} amount={"184.30"} description={"Current Balance"}/>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default User;
