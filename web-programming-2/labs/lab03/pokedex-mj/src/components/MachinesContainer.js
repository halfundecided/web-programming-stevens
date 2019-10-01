import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MachinesList from "./MachinesList";
import Machines from "./Machines";
import ErrorPage from "./Error";

class MachinesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/machines/page/:page" component={MachinesList} />
          <Route path="/machines/:id" component={Machines} />
          <Route path="/404" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default MachinesContainer;
