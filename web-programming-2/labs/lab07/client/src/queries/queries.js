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
      author
    }
  }
`;

export { getUnsplashPostsQuery, getUserPostedImagesQuery, addNewPostMutation };
