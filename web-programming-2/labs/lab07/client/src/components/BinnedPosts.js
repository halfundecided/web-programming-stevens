import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "3rem"
  },
  postSection: {
    flexGrow: 1
  }
}));
const BinnedPosts = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default BinnedPosts;
