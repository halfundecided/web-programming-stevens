const { ApolloServer } = require("apollo-server");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({ typeDefs: "./schema.graphql", resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
