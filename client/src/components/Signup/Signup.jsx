import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import api from '../../api/api'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    width: '100%',
    padding: '5%'
  },
  cover: {
    padding: '70px 0',
    width: '100px',
  },
});

class Signup extends Component {

  state = {
    username: '',
    password: '',
    repeatPassword: '',
    disabled: false,
    error: false,
    passwordMatch: true
  }

  signupSubmitHandler() {
    this.setState({
      disabled: true
    })

    api.post('/register', {
      userName: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      api.defaults.headers['x_auth'] = `${response.headers.x_auth}`
      
      this.props.setUser({
        username: response.data.userName,
        password: response.data.password,
        pantry: response.data.pantry,
        shoppingList: response.data.shoppingList
      });

      this.setState({
        disabled: false
      })

      this.props.history.push('/pantry');
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        disabled: false,
        error: true
      })
     });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="align-center-ver">
        <Row>
          <Col sm="1" md="2" lg="4" />
          <Col sm="10" md="8" lg="4">
            <Card className={classes.card}>
              <Col lg="6">
                <form >
                  
                  <h2> Sign Up </h2>

                  <TextField
                    label="Username"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.username}
                    placeholder="username"
                    fullWidth
                    margin="normal"
                    onChange={(event) => this.setState({username: event.target.value})}
                  />
                  <TextField               
                    label="Password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    fullWidth
                    margin="normal"
                    onChange={(event) => this.setState({password: event.target.value})}
                  />
                  <TextField                   
                    label="Enter password again"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.repeatPassword}
                    fullWidth
                    margin="normal"
                    onChange={(event) => {
                      this.setState({
                        repeatPassword: event.target.value,
                        passwordMatch: this.state.password === event.target.value,
                        disabled: this.state.password !== event.target.value
                      })
                    }}
                  />
                  {!this.state.passwordMatch ? <p style={{color: 'red'}}>passwords don't match</p> : null}
                  {this.state.error ? <p style={{color: 'red'}}>an error has occured</p> : null}
                  <Button
                    type="submit"
                    disabled={this.state.disabled}
                    variant="contained"
                    style={{
                      backgroundColor: '#62AA00'
                    }}
                    className={classes.button}
                    onClick={() => this.signupSubmitHandler()}
                  >
                    Register
                  </Button>
                  
                </ form>

              </ Col>
              <Col lg="2" />
              <Col lg="3">
                <img
                  className={classes.cover}
                  src="logopng.png"
                  alt="eseed logo" />
              </ Col>
            </Card>
          </ Col>
        </ Row>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({
      type: 'SET_USER',
      user
    })
  };
};

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Signup));