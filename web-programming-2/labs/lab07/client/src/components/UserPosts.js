import React from "react";
import { makeStyles, Fab, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const UserPosts = () => {
  return (
    <>
      <Link href="/new-post">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

export default UserPosts;
