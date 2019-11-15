import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UnsplashPosts from "./UnsplashPosts";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "3rem"
  },
  postSection: {
    flexGrow: 1
  },
  button: {}
}));
const Feed = () => {
  const classes = useStyles();
  const [getmore, setGetmore] = useState(1);
  return (
    <div className={classes.root}>
      <UnsplashPosts className={classes.postSection} pageNum={getmore} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<ExpandMoreIcon />}
        onClick={() => setGetmore(getmore + 1)}
      >
        Get More
      </Button>
    </div>
  );
};

export default Feed;
