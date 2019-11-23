import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  addNewPostMutation,
  getUserPostedImagesQuery
} from "../queries/queries";
import {
  makeStyles,
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "3rem",
    marginTop: "4rem"
  },
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
  },
  title: {
    textAlign: "center",
    margin: "2rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const NewPostForm = () => {
  const classes = useStyles();

  const [uploadImage] = useMutation(addNewPostMutation);
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const authorCB = useCallback(e => setAuthor(e.target.value), []);
  const urlCB = useCallback(e => setUrl(e.target.value), []);
  const descriptionCB = useCallback(e => setDescription(e.target.value), []);
  const addCB = useCallback(
    e => {
      e.preventDefault();
      uploadImage({
        variables: {
          url,
          description,
          author
        },
        refetchQueries: [{ query: getUserPostedImagesQuery }]
      });
    },
    [url, description, author, uploadImage]
  );

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h4" gutterBottom>
              Upload NEW
            </Typography>
            <form className={classes.form} onSubmit={addCB}>
              <div>
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
              </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type="submit"
              >
                Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewPostForm;
