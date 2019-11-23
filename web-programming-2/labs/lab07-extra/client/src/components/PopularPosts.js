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
  getTopTenBinnedImagesQuery,
  updatePostMutation
} from "../queries/queries";
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

const PopularPosts = () => {
  const classes = useStyles();
  const [updateImage] = useMutation(updatePostMutation);

  const { loading, error, data } = useQuery(getTopTenBinnedImagesQuery, {
    pollInterval: 500
  });
  if (loading)
    return (
      <div>
        <CircularProgress />
        loading
      </div>
    );
  if (error) return <p>Error :(</p>;

  console.log(data);
  const { getTopTenBinnedPosts } = data;
  const topTenBinnedPost = getTopTenBinnedPosts.map(
    ({ id, poster_name, url, description, user_posted, binned, numBinned }) => {
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
                      binned: false,
                      numBinned
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
                      binned: true,
                      numBinned: numBinned + 1
                    }
                  });
                }}
              >
                Add to Bin
              </Button>
            )}
          </div>
        </Card>
      );
    }
  );

  return <>{topTenBinnedPost}</>;
};

export default PopularPosts;
