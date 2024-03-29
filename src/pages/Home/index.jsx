//React
import React from 'react';

//Redux
import { useSelector } from 'react-redux'

//Selectors Redux
import {isUserLoggedIn, userData} from '../../utils/selectors';

//Components
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner';
import FeaturesCard from '../../components/FeaturesCard';
import Footer from '../../components/Footer';

//Images
import chatIcon from '../../assets/images/home/icon-chat.png';
import moneyIcon from '../../assets/images/home/icon-money.png';
import securityIcon from '../../assets/images/home/icon-security.png';

//Style
import '../../styles/pages/Home.css';
import '../../styles/responsive/pages/Home.css';


function Home()
{

  // Retrieving useful data with selectors
  const loginStatus = useSelector(isUserLoggedIn);
  const user = useSelector(userData);
  
  return (
    <React.Fragment>
      <Header loginStatus={loginStatus} user={user}/>
      <main>
        <h1 className='screen-reader-only'>Argent Bank</h1>
        <Banner />
        <section className='features'>
          <h2 className='features__title screen-reader-only'>Features</h2>
          <FeaturesCard logo={chatIcon} altMessage={"Chat Icon"} catchphrase={"You are our #1 priority"} description={"Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."} />
          <FeaturesCard logo={moneyIcon} altMessage={"Money Icon"} catchphrase={"More savings means higher rates"} description={"The more you save with us, the higher your interest rate will be!"} />
          <FeaturesCard logo={securityIcon} altMessage={"Security Icon"} catchphrase={"Security you can trust"} description={"We use top of the line encryption to make sure your data and money is always safe."} />
        </section> 
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
