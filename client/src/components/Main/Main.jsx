import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Drawer from './Drawer/Drawer.jsx';
import Footer from './Footer/Footer.jsx';
import Aux from '../Aux.jsx';
import { Route, Redirect, Switch } from 'react-router-dom'; 
import Recipes from './Recipes/Recipes';

class Main extends Component {

  state = {
    drawerOpen: false,
    recipes: [
      
    ]
  }

  render () {
    return <Aux>
        <Navbar navigate={path => this.props.history.push(path)} openDrawer={() => this.setState(
              { drawerOpen: true }
            )} />
        <Drawer isOpen={this.state.drawerOpen} closeDrawer={() => this.setState(
              { drawerOpen: false }
            )} />
        <div style={{ minHeight: "100%" }}>
          <Switch>
            <Route path="/recipes" exact component={Recipes} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
        <Footer />
      </Aux>;
  }
}

export default Main;