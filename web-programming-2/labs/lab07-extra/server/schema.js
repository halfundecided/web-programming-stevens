const { gql } = require("apollo-server");

const typeDefs = gql`
  type ImagePost {
    id: ID!
    url: String!
    poster_name: String!
    description: String
    user_posted: Boolean!
    binned: Boolean!
    numBinned: Int!
  }

  type Query {
    unsplashImages(pageNum: Int): [ImagePost]
    binnedImages: [ImagePost]
    userPostedImages: [ImagePost]
    getTopTenBinnedPosts: [ImagePost]
  }

  type Mutation {
    uploadImage(url: String!, description: String, author: String): ImagePost
    updateImage(
      id: ID!
      url: String
      author: String
      description: String
      user_posted: Boolean
      binned: Boolean
      numBinned: Int
    ): ImagePost
    deleteImage(id: ID!): ImagePost
  }
`;

module.exports = { typeDefs };
