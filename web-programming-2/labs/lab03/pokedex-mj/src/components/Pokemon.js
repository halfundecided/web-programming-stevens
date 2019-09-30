import React, { Component } from "react";
import axios from "axios";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

  async getPokemon() {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
      );
      this.setState({
        data: response.data,
        loading: false
      });
    } catch (e) {
      this.setState({
        error: true
      });
      console.log(`error: ${e}`);
    }
  }

  render() {
    // if (this.state.error) {
    //   return <Redirect to="/404" />;
    // }
    let body = null;
    if (this.state.loading) {
      body = (
        <div>
          <h1>Pokemon</h1>
          <br />
          Loading...
        </div>
      );
    } else if (this.state.error) {
      body = (
        <div>
          <h1>{this.state.error}</h1>
        </div>
      );
    } else {
      // rendering info
    }
    return body;
  }
}

export default Pokemon;
