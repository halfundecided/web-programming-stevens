import { gql } from "apollo-boost";

const getUnsplashPostsQuery = gql`
  query($pageNum: Int) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      poster_name
      description
      user_posted
      binned
      numBinned
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
      user_posted
      binned
      numBinned
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
      user_posted
      binned
      numBinned
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
    $numBinned: Int
  ) {
    updateImage(
      id: $id
      url: $url
      author: $author
      description: $description
      user_posted: $user_posted
      binned: $binned
      numBinned: $numBinned
    ) {
      id
      url
      poster_name
      description
      user_posted
      binned
      numBinned
    }
  }
`;

const deletePostMutation = gql`
  mutation($id: ID!) {
    deleteImage(id: $id) {
      id
      url
      poster_name
      description
      user_posted
      binned
      numBinned
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
      user_posted
      binned
      numBinned
    }
  }
`;

const getTopTenBinnedImagesQuery = gql`
  {
    getTopTenBinnedPosts {
      id
      url
      poster_name
      description
      user_posted
      binned
      numBinned
    }
  }
`;

export {
  getUnsplashPostsQuery,
  getUserPostedImagesQuery,
  addNewPostMutation,
  updatePostMutation,
  deletePostMutation,
  getBinnedImagesQuery,
  getTopTenBinnedImagesQuery
};
