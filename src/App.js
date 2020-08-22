import React, { useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from './pages/Login';
import { auth } from './services/firebase';

import './App.css';

function PublicRoute({ component: Component, authenticated, ...rest }) {
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
    <Router>
      <Switch>
        <PublicRoute path="/login" authenticated={isAuthenticated} component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
