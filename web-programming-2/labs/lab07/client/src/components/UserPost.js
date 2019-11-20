import React from "react";
import {
  makeStyles,
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Fab
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { getUserPostedImagesQuery } from "../queries/queries";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 600,
    maxWidth: 600,
    margin: "3rem"
  },
  avatar: {
    backgroundColor: "#9cabff"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  buttonWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4)
  },
  extendedIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

const UserPost = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(getUserPostedImagesQuery);

  if (loading)
    return (
      <>
        <CircularProgress />
        loading
      </>
    );

  if (error) return <p> Error :(</p>;

  const { userPostedImages } = data;
  const userPostedImagePost = userPostedImages.map(
    ({ id, poster_name, url, description, binned }) => {
      return (
        <Card key={id} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <PhotoCameraIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" gutterBottom>
                {poster_name}
              </Typography>
            }
          />
          <CardMedia className={classes.media} image={url} />
          <CardContent>
            <Typography variant="overline" display="block" gutterBottom>
              {description}
            </Typography>
          </CardContent>
          <div className={classes.buttonWrap}>
            {binned ? (
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="remove"
                className={classes.binButton}
              >
                <RemoveCircleOutlineIcon className={classes.extendedIcon} />
                Remove from Bin
              </Fab>
            ) : (
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.binButton}
              >
                <AddCircleOutlineIcon className={classes.extendedIcon} />
                Add to Bin
              </Fab>
            )}
          </div>
        </Card>
      );
    }
  );
  return <>{userPostedImagePost}</>;
};

export default UserPost;
