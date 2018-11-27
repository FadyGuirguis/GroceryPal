import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Drawer from './Drawer/Drawer.jsx';
import Footer from './Footer/Footer.jsx';
import Aux from '../Aux.jsx';

class Main extends Component {

  state = {
    drawerOpen: false
  }

  render () {
    return (
      <Aux>
        <Navbar 
          navigate={(path) => this.props.history.push(path)}
          openDrawer={() => this.setState({drawerOpen: true})}
          />
        <Drawer
          isOpen={this.state.drawerOpen}
          closeDrawer={() => this.setState({drawerOpen: false})}
          />
        <div style={{
          minHeight: '100%'
        }}>
          
        </div>
        <Footer />
      </Aux>
      
    )
  }
}

export default Main;