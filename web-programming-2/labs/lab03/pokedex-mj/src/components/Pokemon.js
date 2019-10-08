import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import noImage from "../images/noImage.png";

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
    if (this.state.error) {
      return <Redirect to="/404" />;
    } else if (this.state.loading) {
      body = (
        <div>
          <br />
          <br />
          <CircularProgress style={{ color: "#ffcccc" }} />
        </div>
      );
    } else if (this.state.error) {
      return <Redirect to="/404" />;
    } else {
      let img = null;
      if (this.state.data.sprites.front_default) {
        img = <img alt="pokemon" src={this.state.data.sprites.front_default} />;
      } else {
        img = <img alt="pokemon" src={noImage} />;
      }

      body = (
        <div>
          <Card
            style={{
              minWidth: 275,
              backgroundColor: "#f3f1eb",
              padding: "3rem",
              margin: "5rem"
            }}
          >
            <CardContent>
              <Typography
                style={{ fontSize: 20 }}
                color="textSecondary"
                gutterBottom
              >
                {this.state.data && this.state.data.name}
              </Typography>
              {img}
              <Table
                style={{
                  padding: "5rem"
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Section</TableCell>
                    <TableCell align="left">Values</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell align="left">
                      {this.state.data && this.state.data.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Base Experience
                    </TableCell>
                    <TableCell align="left">
                      {this.state.data.base_experience}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Height
                    </TableCell>
                    <TableCell align="left">{this.state.data.height}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Weight
                    </TableCell>
                    <TableCell align="left">{this.state.data.weight}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Abilities
                    </TableCell>
                    <TableCell align="left">
                      {this.state.data.abilities.map(element => {
                        return (
                          <ul key={element.ability.name}>
                            {element.ability.name}
                          </ul>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Forms
                    </TableCell>
                    <TableCell align="left">
                      {this.state.data.forms.map(element => {
                        return <ul key={element.name}>{element.name}</ul>;
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }
    return body;
  }
}

export default Pokemon;
