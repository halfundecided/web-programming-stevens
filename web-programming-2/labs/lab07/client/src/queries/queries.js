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

export { getUnsplashPostsQuery, getUserPostedImagesQuery };
