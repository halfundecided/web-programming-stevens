import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import BinPage from "./BinPage/BinPage";
import PostPage from "./PostPage/PostPage";
import NewPostPage from "./NewPostPage/NewPostPage";

const BinterestRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={() => <HomePage />} />
        <Route path={"/my-bin"} component={() => <BinPage />} />
        <Route path={"/my-posts"} component={() => <PostPage />} />
        <Route path={"/new-post"} component={() => <NewPostPage />} />
      </Switch>
    </Router>
  );
};

export default BinterestRouter;
