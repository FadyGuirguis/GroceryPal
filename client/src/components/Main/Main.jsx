import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.jsx';

class Main extends Component {
  render () {
    return (
      <div>
        <Navbar 
          navigate={(path) => this.props.history.push(path)}/>
      </div>
      
    )
  }
}

export default Main;