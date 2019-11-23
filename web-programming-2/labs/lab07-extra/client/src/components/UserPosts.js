import React from "react";
import { makeStyles, Fab, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserPost from "./UserPost";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "3rem"
  },
  postSection: {
    flexGrow: 1
  },
  addButton: {
    marginTop: "3rem"
  }
}));
const UserPosts = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link className={classes.addButton} href="/new-post">
        <Fab variant="extended" color="primary" aria-label="add">
          <AddIcon />
          Upload
        </Fab>
      </Link>
      <UserPost className={classes.postSection} />
    </div>
  );
};

export default UserPosts;
