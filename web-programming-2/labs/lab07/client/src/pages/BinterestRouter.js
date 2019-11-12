import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";

const BinterestRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={() => <HomePage />} />
        <Route path={"/my-bin"} component={() => <h1>Todo: my-bin page</h1>} />
        <Route
          path={"/my-posts"}
          component={() => <h1>Todo: my-posts page</h1>}
        />
        {/* <Route
          path={"/new-post"}
          component={() => <h1>Todo: new post page</h1>}
        /> */}
      </Switch>
    </Router>
  );
};

export default BinterestRouter;
