import React from "react";
import { makeStyles, Card, CardContent, TextField } from "@material-ui/core";

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
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <TextField
            id="filled-full-width"
            label="Author name"
            style={{ margin: 8 }}
            placeholder="Author Name"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
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
            variant="filled"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPostForm;
