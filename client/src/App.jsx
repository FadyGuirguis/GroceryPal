import React from 'react';
import Login from './components/Login/Login.jsx';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom'; 

const app = (props) => {
  
    return (
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Redirect from="/" to="/login" />
        </ Switch>   
      </div>
    )
  
}


export default app;
