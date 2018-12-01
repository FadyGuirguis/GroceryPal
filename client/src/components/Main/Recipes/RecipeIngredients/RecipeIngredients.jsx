import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#62AA00',
  },
});

const recipeIngredients = props => {
  const {classes} = props;
  return (
    <List className={classes.root}>
      {props.pantry.map(ingredient => (
        <ListItem key={ingredient} role={undefined} dense button onClick={() => props.handleToggle(ingredient)}>
          <Checkbox
            checked={props.checked.indexOf(ingredient) !== -1}
            tabIndex={-1}
            disableRipple
            style={{
              color: 'white'
            }}
          />
          <ListItemText style={{color: 'white'}} primary={ingredient} />
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(recipeIngredients);