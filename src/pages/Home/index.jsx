//React
import React from 'react';

//Components
import Banner from '../../components/Banner';

function Home() {
  return (
    <React.Fragment>
      <main>
        <h1 className='screen-reader-only'>Argent Bank</h1>
        <Banner />
      </main>
    </React.Fragment>
  );
}

export default Home;
