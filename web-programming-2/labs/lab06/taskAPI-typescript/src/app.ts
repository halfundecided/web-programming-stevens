import * as express from "express";
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request
import { Tasks } from "./routes/taskRoute";
var totalRequests: number = 0;
var accessed: object = {};
class App {
  public app: express.Application;
  // public pokeRoutes: Pokemons = new Pokemons();
  public taskRoutes: Tasks = new Tasks();

  constructor() {
    this.app = express(); //run the express instance and store in app
    this.config();
    // this.pokeRoutes.routes(this.app);
    this.taskRoutes.routes(this.app);
  }

  Logger = (req: express.Request, res: express.Response, next: Function) => {
    //middleware here
    console.log("====================== REQUEST ======================");
    totalRequests++;
    console.log(`There has been ${totalRequests} requests made to the server`);
    console.log("=====================================================");
    if (!accessed[req.path]) {
      accessed[req.path] = 0;
    }
    accessed[req.path]++;
    console.log("HTTP: " + req.method);
    console.log("PATH: " + req.originalUrl);
    console.log("BODY: " + JSON.stringify(req.body));
    console.log("TOTAL ACCESSES: " + accessed[req.path]);
    console.log("=====================================================");
    next();
  };

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(this.Logger);
  }
}

export default new App().app;
