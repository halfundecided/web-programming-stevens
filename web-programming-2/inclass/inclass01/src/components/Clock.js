import React, { Component } from "react";
import "./App.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      timeZone: this.props.timeZone
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: this.props.date,
      timeZone: this.props.timeZone
    });
  }

  render() {
    return (
      <div>
        <h2>
          It is{" "}
          {this.state.date.toLocaleTimeString("en-US", {
            timeZone: this.state.timeZone
          })}{" "}
          in {this.props.timeZone}
        </h2>
      </div>
    );
  }
}

export default Clock;
