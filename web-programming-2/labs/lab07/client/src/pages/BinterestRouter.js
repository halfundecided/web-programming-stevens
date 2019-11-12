import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import BinPage from "./BinPage/BinPage";
import PostPage from "./PostPage/PostPage";

const BinterestRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={() => <HomePage />} />
        <Route path={"/my-bin"} component={() => <BinPage />} />
        <Route path={"/my-posts"} component={() => <PostPage />} />
        {/* <Route
          path={"/new-post"}
          component={() => <h1>Todo: new post page</h1>}
        /> */}
      </Switch>
    </Router>
  );
};

export default BinterestRouter;
