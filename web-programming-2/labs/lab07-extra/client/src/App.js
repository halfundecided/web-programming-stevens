import React from "react";
import BinterestRouter from "./pages/BinterestRouter";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <BinterestRouter />
      </div>
    </ApolloProvider>
  );
};

export default App;
