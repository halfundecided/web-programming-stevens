import * as express from "express";
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request
var totalRequests: number = 0;
class App {
  public app: express.Application;

  constructor() {
    this.app = express(); //run the express instance and store in app
    this.config();
  }

  Logger = (req: express.Request, res: express.Response, next: Function) => {
    //middleware here
    totalRequests++;
    console.log(`There has been ${totalRequests} requests made to the server`);
    console.log(
      "The last request came from: " +
        req.protocol +
        "://" +
        req.get("host") +
        req.originalUrl
    );
    next();
  };

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.app.use(this.Logger);
  }
}

export default new App().app;
