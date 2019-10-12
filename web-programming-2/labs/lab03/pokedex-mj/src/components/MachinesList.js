import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Pagination, PaginationItem } from "reactstrap";
import Paper from "@material-ui/core/Paper";

const paperStyle = {
  margin: "4rem",
  textAlign: "center",
  backgroundColor: "rgb(66,66,66)",
  padding: "1rem"
};

const listStyle = {
  listStyleType: "none",
  marginTop: "1.5rem"
};

const linkStyle = {
  textDecoration: "none",
  color: "#ffcccc",
  borderBottom: "1px solid #ffcccc",
  padding: "0.7rem",
  fontSize: "15px"
};

const pageStyle = {
  display: "flex",
  justifyContent: "space-around",
  paddingLeft: "2rem",
  paddingRight: "2rem"
};

const buttonStyle = {
  textDecoration: "none",
  listStyle: "none",
  color: "#d1ccc0",
  cursor: "all-scroll",
  fontSize: "20px"
};

class MachinesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      page: 0,
      lastPage: 0,
      prev: null,
      next: `https://pokeapi.co/api/v2/machine/`,
      error: false
    };
    this.handlePrevious = this.handlePrevious.bind(this, this.state.page);
    this.handleNext = this.handleNext.bind(this, this.state.page);
  }

  async getMachines(newPage) {
    try {
      if (newPage) {
        await this.setState({ page: newPage });
      }
      let response = await axios.get(
        `https://pokeapi.co/api/v2/machine/?offset=${this.state.page *
          20}&limit=20`
      );
      await this.setState({
        data: response.data.results,
        prev: response.data.previous,
        next: response.data.next,
        lastPage: Math.floor(response.data.count / 20)
      });

      if (
        Number(this.state.page) < 0 ||
        Number(this.state.page) > Number(this.state.lastPage)
      ) {
        this.setState({ error: true });
        console.log("page out of boundary");
      }
    } catch (e) {
      this.setState({ error: true });
      console.log(e);
    }
  }

  async handlePrevious() {
    let pageCounter = Number(this.state.page);
    if (pageCounter > 0) {
      this.setState({ page: pageCounter - 1 }, () => {
        this.getMachines(this.state.page);
        this.props.history.push(`/machines/page/${this.state.page}`);
      });
    }
  }
  async handleNext() {
    let pageCounter = Number(this.state.page);
    if (pageCounter >= 0) {
      this.setState({ page: pageCounter + 1 }, () => {
        this.getMachines(this.state.page);
        this.props.history.push(`/machines/page/${this.state.page}`);
      });
    }
  }

  componentDidMount() {
    let p = this.props.match.params.page;
    this.getMachines(p);
  }

  render() {
    if (this.state.error) {
      return <Redirect to="/404" />;
    }
    let body = null;
    let li = null;
    li =
      this.state.data &&
      this.state.data.map(machine => (
        <li key={machine.id} style={listStyle}>
          <Link style={linkStyle} to={`/machines/${machine.url.split("/")[6]}`}>
            {/* ****How do I display item name */}
            Machine #{machine.url.split("/")[6]}
          </Link>
        </li>
      ));
    let p = (
      <Pagination style={pageStyle}>
        {this.state.prev ? (
          <PaginationItem
            style={buttonStyle}
            previous
            onClick={this.handlePrevious}
          >
            Previous
          </PaginationItem>
        ) : null}
        {this.state.next ? (
          <PaginationItem style={buttonStyle} next onClick={this.handleNext}>
            Next
          </PaginationItem>
        ) : null}
      </Pagination>
    );
    body = (
      <div>
        <Paper style={paperStyle}>
          {p}
          <div>
            <ul>{li}</ul>
          </div>
        </Paper>
      </div>
    );
    return body;
  }
}

export default MachinesList;
