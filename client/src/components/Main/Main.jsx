import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Drawer from './Drawer/Drawer.jsx';

class Main extends Component {

  state = {
    drawerOpen: false
  }

  render () {
    return (
      <div>
        <Navbar 
          navigate={(path) => this.props.history.push(path)}
          openDrawer={() => this.setState({drawerOpen: true})}
          />
        <Drawer
          isOpen={this.state.drawerOpen}
          closeDrawer={() => this.setState({drawerOpen: false})}
          />
      </div>
      
    )
  }
}

export default Main;