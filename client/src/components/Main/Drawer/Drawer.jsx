import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingIcon from '@material-ui/icons/ShoppingCart';
import RecipeIcon from '@material-ui/icons/RestaurantMenu';
import FoodIcon from '@material-ui/icons/Kitchen';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const drawer = (props) => {
  const { classes } = props;

  return (
    <Drawer open={props.isOpen} onClose={() => props.closeDrawer()}>
      <div
        tabIndex={0}
        role="button"
        onClick={() => props.closeDrawer()}
        onKeyDown={() => props.closeDrawer()}
      >

        <List className={classes.list}>
          <ListItem
            button
           // onClick={() => props.showSprintModal()}
           >
            <ListItemIcon>
              <ShoppingIcon />
            </ListItemIcon>
            <ListItemText inset primary="Shopping List" />
          </ListItem>
          <ListItem
            button
           // onClick={() => props.showUSModal()}
           >
            <ListItemIcon>
              <FoodIcon />
            </ListItemIcon>
            <ListItemText inset primary="Pantry" />
          </ListItem>
          <ListItem
            button
           // onClick={() => props.showUSModal()}
           >
            <ListItemIcon>
              <RecipeIcon />
            </ListItemIcon>
            <ListItemText inset primary="Recipes" />
          </ListItem>
        </List>



      </div>
    </Drawer>
  );
}

export default withStyles(styles)(drawer);
