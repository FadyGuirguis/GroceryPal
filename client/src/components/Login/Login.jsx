import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import './Login.css';

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

class Login extends Component {

    state = {
        username: '',
        password: '',
        disabled: false
      }
  
    render () {
        const { classes } = this.props;
        return (
            <div className="align-center-ver">
                <Row>
                    <Col sm="1" md="2" lg="4" />
                    <Col sm="10" md="8" lg="4">
                        <Card className={classes.card}>     
                            <Col lg="6">
                                <form > 
                                    <TextField
                                        id="full-width"
                                        label="Username"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={this.state.username}
                                        placeholder="username"
                                        fullWidth
                                        margin="normal"
                                        //onChange={(event) => this.setState({username: event.target.value})}
                                        />
                                    <TextField
                                        id="full-width"
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
                                        //onChange={(event) => this.setState({password: event.target.value})}
                                    />
                                    <Button 
                                        type="submit"
                                        disabled={this.state.disabled}
                                        variant="contained" 
                                        color="success"
                                        style={{
                                            backgroundColor: '#62AA00'
                                        }} 
                                        className={classes.button}
                                        //onClick={() => this.loginSubmitHandler()}
                                        >
                                        Login
                                    </Button>
                                    <div fullwidth>
                                    Don't have an account yet? Register <a>here</ a>!
                                    </div>
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

export default withStyles(styles, { withTheme: true })(Login);
