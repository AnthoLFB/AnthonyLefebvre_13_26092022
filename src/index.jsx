import React from 'react';
import ReactDOM from 'react-dom/client';

//Router
import { BrowserRouter as Router, Routes as RoutesList, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import Error from './pages/Error';

//Style
import './styles/global/Reset.css';
import './styles/global/Global.css';

//Redux
import { Provider } from 'react-redux';
import store from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <RoutesList>
          
          {/*Accueil*/}
          <Route path="/" element={<Home/>}></Route>
          
          {/*Connexion*/}
          <Route path="/login" element={<Login/>}></Route>

          {/*Utilisateur*/}
          <Route path="/profile" element={<User/>}></Route>

          {/*Erreur*/}
          <Route path="*" element={<Error/>}></Route>
          
        </RoutesList>
      </Router>
    </React.StrictMode>
  </Provider>
);
