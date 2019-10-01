import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Pagination, PaginationItem } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
  border: "1px solid #ffcccc",
  padding: "0.7rem",
  borderRadius: "4px"
};
class BerriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      page: 0,
      lastPage: 0,
      prev: null,
      next: `https://pokeapi.co/api/v2/berry/`,
      error: false
    };
    this.handlePrevious = this.handlePrevious.bind(this, this.state.page);
    this.handleNext = this.handleNext.bind(this, this.state.page);
  }

  async getBerries(newPage) {
    try {
      if (newPage) {
        await this.setState({ page: newPage });
      }
      let response = await axios.get(
        `https://pokeapi.co/api/v2/berry/?offset=${this.state.page *
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
        throw `page out of boundary`;
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
        this.getBerries(this.state.page);
        this.props.history.push(`/berries/page/${this.state.page}`);
      });
    }
  }
  async handleNext() {
    let pageCounter = Number(this.state.page);
    if (pageCounter >= 0) {
      this.setState({ page: pageCounter + 1 }, () => {
        this.getBerries(this.state.page);
        this.props.history.push(`/berries/page/${this.state.page}`);
      });
    }
  }

  componentDidMount() {
    let p = this.props.match.params.page;
    this.getBerries(p);
  }

  render() {
    if (this.state.error) {
      return <Redirect to="/404" />;
    }
    let body = null;
    let li = null;
    li =
      this.state.data &&
      this.state.data.map(berries => (
        <li key={berries.id} style={listStyle}>
          <Link style={linkStyle} to={`/berries/${berries.url.split("/")[6]}`}>
            {berries.name}
          </Link>
        </li>
      ));
    let p = (
      <Pagination aria-label="Page navigation example">
        {this.state.prev ? (
          <PaginationItem previous onClick={this.handlePrevious}>
            Previous
          </PaginationItem>
        ) : null}
        {this.state.next ? (
          <PaginationItem next onClick={this.handleNext}>
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
            <ul>
              <Typography variant="h6" gutterBottom>
                {li}
              </Typography>
            </ul>
          </div>
        </Paper>
      </div>
    );
    return body;
  }
}

export default BerriesList;
