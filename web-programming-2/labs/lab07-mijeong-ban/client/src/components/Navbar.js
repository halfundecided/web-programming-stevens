import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#21252b"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 200,
                height: "auto"
              }
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/my-bin" onClick={handleClose}>
              Bin
            </MenuItem>
            <MenuItem component={Link} to="/my-posts" onClick={handleClose}>
              Post
            </MenuItem>
          </Menu>
          <DeleteSweepIcon />
          <Typography variant="h6" className={classes.title}>
            Binterest
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
