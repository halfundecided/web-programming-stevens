import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class Error extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <Typography style={{ color: "#d1ccc0" }} variant="h5" gutterBottom>
          <span role="img">🚫 404 Error: Page not found 🚫</span>
        </Typography>
      </div>
    );
  }
}

export default Error;
