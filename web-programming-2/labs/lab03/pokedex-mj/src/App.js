import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PokemonContainer from "./components/PokemonContainer";
import BerriesContainer from "./components/BerriesContainer";
import MachinesContainer from "./components/MachinesContainer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 7),
    backgroundColor: "#ffcccc"
  },
  link: {
    display: "flex"
  },
  icon: {
    marginRight: theme.spacing(0.8),
    width: 20,
    height: 20
  }
}));

const appStyle = {
  textAlign: "center",
  margin: "10rem",
  backgroundColor: "rgb(51, 51, 51)",
  borderRadius: "1px",
  height: "110rem"
};

const headerStyle = {
  display: "inline-block",
  marginTop: "2rem"
};

const paperStyle = {
  border: "2.5px solid #ffb8b8"
};

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="App" style={appStyle}>
        <Typography
          variant="h3"
          style={{ color: "#d1ccc0", paddingTop: "3rem" }}
        >
          Welcome!✋🏻 This is the Pokédex!🔬📁
        </Typography>
        <header className="App-header" style={headerStyle}>
          <br />
          <Paper elevation={0} className={classes.root} style={paperStyle}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                color="inherit"
                href="/pokemon/page/0"
                target="_self"
                className={classes.link}
              >
                <HomeIcon className={classes.icon} />
                Pokemon
              </Link>
              <Link
                color="inherit"
                href="berries/page/0"
                target="_self"
                className={classes.link}
              >
                <WhatshotIcon className={classes.icon} />
                Berries
              </Link>
              <Link
                color="inherit"
                href="machines/page/0"
                target="_self"
                className={classes.link}
              >
                <GrainIcon className={classes.icon} />
                Machines
              </Link>
            </Breadcrumbs>
          </Paper>
        </header>
        <div className="App-body">
          <br />
          <Typography variant="h6" style={{ color: "#d1ccc0" }}>
            Sorry,
            <br />
            {"I honestly do not know about Pokemon."}
          </Typography>
          <br />
          <Divider
            style={{
              backgroundColor: "#4b4b4b"
            }}
          />
          <Switch>
            <Route path="/pokemon/" exact component={PokemonContainer} />
            <Route path="/berries/" exact component={BerriesContainer} />
            <Route path="/machines/" exact component={MachinesContainer} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
