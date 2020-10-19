import React, { useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import { auth } from './services/firebase';
import Chat from './pages/Chat';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={(props) => authenticated ? <Component {...props} /> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={ (props) => authenticated ? <Redirect to='/chat' /> :
        <Component {...props} />
      }
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      console.log({ user });
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <div className="App">
      { isAuthenticated ? <Header /> : null }
      <Router>
        <Switch>
          <PublicRoute
            exact
            path='/'
            authenticated={ isAuthenticated }
            component={ Login }
          />
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
  ) : null;
};

export default App;
