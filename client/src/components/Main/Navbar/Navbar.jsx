import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./Navbar.css";

const navbar = props => {
  return (
    <div className="root">
      <AppBar position="static" style={{ backgroundColor: "#62AA00" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => props.openDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className="flex">
            GroceryPal
          </Typography>
          <Button color="inherit" onClick={() => props.navigate("/login")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default navbar;
