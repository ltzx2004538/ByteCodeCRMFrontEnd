import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CRMLogo from './components/CRMLogo';
import LoginForm from './components/LoginForm';
import ToSignUpPage from './components/ToSignUpPage';
import './LoginPage.scss';

const LogIn = () => (
  <div>
    <Switch>
      <Route exact path="/login">
        <CRMLogo />
        <ToSignUpPage />
        <LoginForm />
      </Route>
    </Switch>
  </div>
);

export default LogIn;
