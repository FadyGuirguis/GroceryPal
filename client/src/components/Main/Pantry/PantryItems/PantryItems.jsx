import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingIcon from '@material-ui/icons/ShoppingBasket';
import Divider from '@material-ui/core/Divider';
import {Row, Col} from 'reactstrap';
import Aux from '../../../Aux.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    height: '100%',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
});

const pantryItems = props => {
    const { classes } = props;

    return <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List dense={false}>
              {props.list.map((item, index) => <Aux key={index}>
                  <ListItem>
                    <ListItemText primary={item} />
                    <Row>
                      <Col xs="6">
                        <ListItemSecondaryAction>
                          <IconButton 
                            color="secondary" 
                            aria-label="Delete"
                            onClick={() => props.delete(item)}
                            disabled={props.disabled}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Col>
                      <Col xs="6">
                        <ListItemSecondaryAction>
                          <IconButton 
                            color='primary' 
                            aria-label="Delete"
                            onClick={() => props.move(item)}
                            disabled={props.disabled}>
                            <ShoppingIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Col>
                    </Row>
                  </ListItem>
                  <Divider />
                </Aux>)}
            </List>
          </div>
        </Grid>
      </div>;
}

export default withStyles(styles)(pantryItems);