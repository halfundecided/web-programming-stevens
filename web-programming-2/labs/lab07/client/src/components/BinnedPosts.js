import React from "react";
import { makeStyles } from "@material-ui/core";
import BinnedPost from "./BinnedPost";

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
  return (
    <div className={classes.root}>
      <BinnedPost className={classes.postSection} />
    </div>
  );
};

export default BinnedPosts;
