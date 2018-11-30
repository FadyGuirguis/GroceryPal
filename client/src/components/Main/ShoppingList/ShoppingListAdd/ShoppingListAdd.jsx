import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { Col } from "reactstrap";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  card: {
    marginTop: '20%',
    display: "flex",
    width: "100%",
    padding: "1%"
  },
  cover: {
    padding: "70px 0",
    width: "100px"
  }
});

const shoppingListAdd = props => {
  const {classes} = props;
  return <Card className={classes.card}>
      <Col lg={{size: 10, offset: 1}}>
        <form>
          <h5>Add items to your shopping list</h5>
          <TextField 
             
            autoFocus 
            InputLabelProps={{ shrink: true }} 
            value={props.searchString} 
            onChange={event => props.change(event.target.value)}
            placeholder="type here!" fullWidth 
            margin="normal" />
          
          
          <Button 
            disabled={props.disabled} 
            variant="contained" 
            color="primary"
            className={classes.button}
            onClick={() => props.add()}>
            Add
          </Button>
        </form>
      </Col>
    </Card>;
}

export default withStyles(styles, { withTheme: true })(shoppingListAdd);