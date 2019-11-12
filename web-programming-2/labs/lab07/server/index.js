const { ApolloServer } = require("apollo-server");

const resolvers = {};

const server = new ApolloServer({ typeDefs: "./schema.graphql", resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
