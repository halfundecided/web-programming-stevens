import React from "react";
import Navbar from "../../components/Navbar";
import UserPosts from "../../components/UserPosts";
import { makeStyles, Fab, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function PostPage() {
  return (
    <div>
      <Navbar />
      <Link href="/new-post">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      <UserPosts />
    </div>
  );
}
