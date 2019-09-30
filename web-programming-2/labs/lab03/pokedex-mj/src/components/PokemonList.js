import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      page: 0,
      total: 0,
      lastPage: 0,
      prev: null,
      next: `https://pokeapi.co/api/v2/pokemon/`,
      error: false
    };
    this.handlePrevious = this.handlePrevious.bind(this, this.state.page);
    this.handleNext = this.handleNext.bind(this, this.state.page);
  }

  async getPokemons(newPage) {
    try {
      if (newPage) {
        await this.setState({ page: newPage });
      }
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.page *
          20}&limit=20`
      );
      await this.setState({
        data: response.data.results,
        total: response.data.count,
        prev: response.data.previous,
        next: response.data.next,
        lastPage: Math.floor(response.data.count / 20)
      });

      if (
        Number(this.state.page) < 0 ||
        Number(this.state.page) > Number(this.state.lastPage)
      ) {
        throw `out of boundary page`;
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
        this.getPokemons(this.state.page);
        this.props.history.push(`/pokemon/page/${this.state.page}`);
      });
    }
  }
  async handleNext() {
    let pageCounter = Number(this.state.page);
    if (pageCounter >= 0) {
      this.setState({ page: pageCounter + 1 }, () => {
        this.getPokemons(this.state.page);
        this.props.history.push(`/pokemon/page/${this.state.page}`);
      });
    }
  }

  componentDidMount() {
    this.getPokemons();
  }

  render() {
    // if (this.state.error) {
    //   return <Redirect to="/404" />;
    // }
    let body = null;
    let li = null;
    li =
      this.state.data &&
      this.state.data.map(pokemon => (
        <li key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.url.split("/"[6])}`}>
            {pokemon.name}
          </Link>
        </li>
      ));
    let p = (
      <Pagination>
        {this.state.prev ? <Pagination.Prev onClick={this.handlePrev} /> : null}
        {this.state.next ? <Pagination.Next onClick={this.handleNext} /> : null}
      </Pagination>
    );
    body = (
      <div>
        <div>
          <ul>{li}</ul>
        </div>
        {p}
      </div>
    );
    return body;
  }
}

export default PokemonList;
