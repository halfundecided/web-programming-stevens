import React from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "../../components/Navbar";
import PopularPosts from "../../components/PopularPosts";

const useStyles = makeStyles(() => ({
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

export default function NewPostPage() {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <PopularPosts className={classes.postSection} />
      </div>
    </div>
  );
}
