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
  Button
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getUserPostedImagesQuery,
  deletePostMutation,
  updatePostMutation
} from "../queries/queries";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: theme.spacing(4)
  },
  extendedIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

const UserPost = () => {
  const classes = useStyles();
  // const [updateImage] = useMutation(updatePostMutation, {
  //   update(cache, { data: { updateImage } }) {
  //     const { images } = cache.readQuery({ query: getUserPostedImagesQuery });
  //     cache.writeQuery({
  //       query: getUserPostedImagesQuery,
  //       data: { images: images.concat([updateImage]) }
  //     });
  //   }
  // });
  const [updateImage] = useMutation(updatePostMutation);
  const [deleteImage] = useMutation(deletePostMutation);
  const { loading, error, data } = useQuery(getUserPostedImagesQuery, {
    pollInterval: 500
  });

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
    ({ id, poster_name, url, description, user_posted, binned }) => {
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
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={
                  <RemoveCircleOutlineIcon className={classes.extendedIcon} />
                }
                onClick={e => {
                  updateImage({
                    variables: {
                      id,
                      url,
                      author: poster_name,
                      description,
                      user_posted,
                      binned: false
                    }
                  });
                }}
              >
                Remove from Bin
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={
                  <AddCircleOutlineIcon className={classes.extendedIcon} />
                }
                onClick={e => {
                  updateImage({
                    variables: {
                      id,
                      url,
                      author: poster_name,
                      description,
                      user_posted,
                      binned: true
                    }
                  });
                }}
              >
                Add to Bin
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon className={classes.extendedIcon} />}
              onClick={e => {
                deleteImage({
                  variables: {
                    id: id
                  }
                });
              }}
            >
              Delete this Post
            </Button>
          </div>
        </Card>
      );
    }
  );
  return <>{userPostedImagePost}</>;
};

export default UserPost;
