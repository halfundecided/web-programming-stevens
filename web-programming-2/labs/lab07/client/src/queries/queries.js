import { gql } from "apollo-boost";

const getUnsplashPostsQuery = gql`
  query($pageNum: Int) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      poster_name
      description
      binned
    }
  }
`;

const getUserPostedImagesQuery = gql`
  {
    userPostedImages {
      id
      url
      poster_name
      description
      binned
    }
  }
`;

const addNewPostMutation = gql`
  mutation($url: String!, $description: String, $author: String) {
    uploadImage(url: $url, description: $description, author: $author) {
      id
      url
      poster_name
      description
      binned
    }
  }
`;

const updatePostMutation = gql`
  mutation(
    $id: ID!
    $url: String
    $author: String
    $description: String
    $user_posted: Boolean
    $binned: Boolean
  ) {
    updateImage(
      id: $id
      url: $url
      description: $description
      user_posted: $user_posted
      binned: $binned
    ) {
      id
      binned
    }
  }
`;

const deletePostMutation = gql`
  mutation($id: ID!) {
    deleteImage(id: $id) {
      id
    }
  }
`;

const getBinnedImagesQuery = gql`
  {
    binnedImages {
      id
      url
      poster_name
      description
      binned
    }
  }
`;

export {
  getUnsplashPostsQuery,
  getUserPostedImagesQuery,
  addNewPostMutation,
  updatePostMutation,
  deletePostMutation,
  getBinnedImagesQuery
};
