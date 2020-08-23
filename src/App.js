import React, { useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import { auth } from './services/firebase';
import Header from './components/Header';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? <h2>Loading...</h2> : (
    <div>
      { isAuthenticated ? <Header /> : null }
      <Router>
        <Switch>
          <PrivateRoute
            path='/chat'
            authenticated={ isAuthenticated }
            component={ Chat }
          />
          <PublicRoute
            path='/login'
            authenticated={ isAuthenticated }
            component={ Login }
          />
          <PublicRoute
            path='/signup'
            authenticated={ isAuthenticated }
            component={ Signup }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
