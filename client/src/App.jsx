import React from 'react';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import { Route, Redirect, Switch } from 'react-router-dom'; 
import Main from './components/Main/Main.jsx';

const app = (props) => {
  
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/recipes" exact component={Main} />
        <Route path="/pantry" exact component={Main} />
        <Route path="/shoppinglist" exact component={Main} />
        <Redirect from="/" to="/login" />
      </ Switch>   
    )
  
}


export default app;
