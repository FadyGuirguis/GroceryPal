import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import api from '../../api/api'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  card: {
    display: "flex",
    width: "100%",
    padding: "5%"
  },
  cover: {
    padding: "70px 0",
    width: "100px"
  }
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    disabled: false,
    error: false
  };

  loginSubmitHandler () {
    this.setState({
      disabled: true
    })

    api.post('/login', {
      userName: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      api.defaults.headers['x_auth'] = `${response.data.x_auth}`
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
      this.setState({
        disabled: false,
        error: true
      })
     });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="align-center-ver">
        <Row>
          <Col sm="1" md="2" lg="4" />
          <Col sm="10" md="8" lg="4">
            <Card className={classes.card}>
              <Col lg="6">
                <form>
                  <TextField
                    label="Username"
                    autoFocus
                    InputLabelProps={{
                      shrink: true
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
                      shrink: true
                    }}
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    fullWidth
                    margin="normal"
                    onChange={(event) => this.setState({password: event.target.value})}
                  />
                  {this.state.error ? <p style={{color: 'red'}}>username or password incorrect</p> : null}
                  
                  <Button
                    type="submit"
                    disabled={this.state.disabled}
                    variant="contained"
                    style={{
                      backgroundColor: "#62AA00"
                    }}
                    className={classes.button}
                    onClick={() => this.loginSubmitHandler()}
                  >
                    Login
                  </Button>
                  <div>
                    Don't have an account yet? Register
                    <a
                      style={{
                        color: "blue"
                      }}
                      onClick={() => this.props.history.push("/signup")}
                    >
                      {" "}
                      here
                    </a>
                    !
                  </div>
                </form>
              </Col>
              <Col lg="2" />
              <Col lg="3">
                <img
                  className={classes.cover}
                  src="logopng.png"
                  alt="eseed logo"
                />
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
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

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Login));
