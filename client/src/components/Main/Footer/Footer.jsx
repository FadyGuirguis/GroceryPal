import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  footer: {
    position: 'relative',
    backgroundColor: "#333333",
    color: '#AAAAAA',
    textAlign: "center",
    padding: "20px", 
    display: "block",
    left: "0",
    bottom: "0",
    width: "100%", 
  }
};

const footer = (props) => {

  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <h6>
        Designed and implemented by 
        <a target="blank" href="https://github.com/FadyGuirguis"> Fady Sameh</a>,
        <a target="blank" href="https://github.com/Zeyad-Zaky"> Zeyad Zaky</a> and
        <a target="blank" href="https://github.com/BishoZaki"> Bishoy Farid</a>
      </h6>
    </ footer>
  )
}

export default withStyles(styles)(footer);