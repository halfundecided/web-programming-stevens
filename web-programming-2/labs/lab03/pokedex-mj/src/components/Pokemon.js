import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: false
    };
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

  componentWillMount() {
    this.getPokemon();
  }

  render() {
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
      return <Redirect to="/404" />;
    } else {
      let img = null;
      // imageeee

      body = (
        <div>
          <p>{this.state.data && this.state.data.name}</p>
          <p>Base Experience: {this.state.data.base_experience}</p>
          <p>Height: {this.state.data.height}</p>
          <p>Weight: {this.state.data.weight}</p>
          <p>Abilities:</p>
          <ul>
            {this.state.data.abilities.map(element => {
              return <ul key={element.ability.name}>{element.ability.name}</ul>;
            })}
          </ul>
          <p>Forms</p>
          <ul>
            {this.state.data.forms.map(element => {
              return <ul key={element.name}>{element.name}</ul>;
            })}
          </ul>
          <p>Moves</p>
          <ul>
            {this.state.data.moves.map(element => {
              return <ul key={element.move.name}>{element.move.name}</ul>;
            })}
          </ul>
          <p>Types</p>
        </div>
      );
    }
    return body;
  }
}

export default Pokemon;
