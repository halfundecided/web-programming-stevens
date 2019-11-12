const { ApolloServer, gql } = require("apollo-server");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const typeDefs = gql`
  type ImagePost {
    id: ID!
    url: String!
    poster_name: String!
    description: String!
    user_posted: Boolean!
    binned: Boolean!
  }

  type Query {
    # unsplashImages(pageNum: Int): [ImagePost]
    unsplashImages: [ImagePost]
    likedImages: [ImagePost]
    userPostedImages: [ImagePost]
  }

  type Mutation {
    uploadImage(url: String!, description: String, author: String): ImagePost
    updateImage(url: String, description: String, binned: Boolean): ImagePost
    deleteImage(id: ID!): ImagePost
  }
`;

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
