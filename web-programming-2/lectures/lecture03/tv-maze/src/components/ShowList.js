import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      searchTerm: undefined,
      searchData: undefined
    };
  }

  async getShows() {
    try {
      const response = await axios.get("http://api.tvmaze.com/shows");
      this.setState({ data: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getShows();
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({ searchTerm: value }, () => {
      this.searchShows();
    });
  };

  onSubmit(e) {
    e.preventDefault();
  }

  async searchShows() {
    if (this.state.searchTerm) {
      try {
        const response = await axios.get(
          "http://api.tvmaze.com/search.shows?q=" + this.state.searchTerm
        );
        this.setState({ searchData: response.data });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    let body = null;
    let li = bull;
    if (this.state.searchTerm) {
    }
  }
}
