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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 3)
  },
  link: {
    display: "flex"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

const appStyle = {
  textAlign: "center",
  margin: "10rem",
  backgroundColor: "rgb(51, 51, 51)",
  borderRadius: "1px",
  height: "90rem"
};

const headerStyle = {
  display: "inline-block",
  marginTop: "2rem"
};

const paperStyle = {
  border: "3px solid #a4b0be"
};

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="App" style={appStyle}>
        <header className="App-header" style={headerStyle}>
          <Paper elevation={0} className={classes.root} style={paperStyle}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                color="inherit"
                href="/pokemon/page/0"
                className={classes.link}
              >
                <HomeIcon className={classes.icon} />
                Pokemon
              </Link>
              <Link
                color="inherit"
                href="berries/page/0"
                className={classes.link}
              >
                <WhatshotIcon className={classes.icon} />
                Berries
              </Link>
              <Link
                color="inherit"
                href="machines/page/0"
                className={classes.link}
              >
                <GrainIcon className={classes.icon} />
                Machines
              </Link>
            </Breadcrumbs>
          </Paper>
        </header>
        <div className="App-body">
          <p>Pokemon explanation...</p>
          <Switch>
            <Route path="/pokemon/" component={PokemonContainer} />
            {/* <Route path="/berries/" component={BerriesContainer} /> */}
            {/* <Route path="/machines" component={MachinesContainer} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
