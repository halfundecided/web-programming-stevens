import React from "react";
import { makeStyles, Paper, Breadcrumbs, Link } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import HomePage from "../pages/HomePage/HomePage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    border: "1px solid black",
    padding: "3rem",
    display: "flex",
    justifyContent: "center"
  },
  link: {
    fontSize: "1.5rem",
    padding: "1rem"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));
const Navbar = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs arial-label="breadcrumb">
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Material-UI
        </Link>
        <Link color="inherit" href="/my-bin" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Material-UI
        </Link>
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Material-UI
        </Link>
      </Breadcrumbs>
    </Paper>
  );
};

export default Navbar;
