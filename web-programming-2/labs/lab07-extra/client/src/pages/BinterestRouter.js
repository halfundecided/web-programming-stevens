import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import BinPage from "./BinPage/BinPage";
import PostPage from "./PostPage/PostPage";
import NewPostPage from "./NewPostPage/NewPostPage";
import PopularityPage from "./PopularityPage/PopularityPage";

const BinterestRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={() => <HomePage />} />
        <Route path={"/my-bin"} component={() => <BinPage />} />
        <Route path={"/my-posts"} component={() => <PostPage />} />
        <Route path={"/new-post"} component={() => <NewPostPage />} />
        <Route path={"/popularity"} component={() => <PopularityPage />} />
      </Switch>
    </Router>
  );
};

export default BinterestRouter;
