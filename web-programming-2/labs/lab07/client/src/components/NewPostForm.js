import React, { useCallback, useState } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    minWidth: 550
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const NewPostForm = () => {
  const classes = useStyles();

  //   const [addPost] = useMutation(addPostMutation)
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const authorCB = useCallback(e => setAuthor(e.target.value));
  const urlCB = useCallback(e => setUrl(e.target.value));
  const descriptionCB = useCallback(e => setDescription(e.target.value));
  const addCB = useCallback(e => {
    e.preventDefault();
  });

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={addCB}>
            <TextField
              id="filled-full-width"
              label="Author name"
              style={{ margin: 8 }}
              placeholder="Author Name"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              onChange={authorCB}
            />
            <TextField
              id="filled-full-width"
              label="Image URL"
              style={{ margin: 8 }}
              placeholder="Image URL"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              onChange={urlCB}
            />
            <TextField
              id="outlined-full-width"
              label="Description"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Simple Description"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              onChange={descriptionCB}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPostForm;
