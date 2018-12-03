import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/Info';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '10%'
  },
  media: {
    height: 0,
    paddingTop: '50%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const recipe = props => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.title}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title} />
      <CardContent>
        {props.ingredients.map(ingredient => (
          <Typography key={ingredient}>- {ingredient}</Typography> 
        ))}
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <a className={classes.expand} target="blank" href={props.url}>
          <IconButton
            className={classes.expand}
          >
            <ExpandMoreIcon />
          </IconButton>
        </a>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(recipe);