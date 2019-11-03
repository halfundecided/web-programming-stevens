import * as express from "express";
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";
import TaskRoutes from "../routes/taskRoutes";
var totalRequests: number = 0;
// class App {
//   public app: express.Application;
//   public mongoUrl: string = "mongodb://localhost/27017";
//   public routePrev: Tasks = new Tasks();

//   constructor() {
//     this.app = express(); //run the express instance and store in app
//     this.config();
//     this.mongoSetup();
//     this.routePrev.routes(this.app);
//   }

//   Logger = (req: express.Request, res: express.Response, next: Function) => {
//     //middleware here
//     totalRequests++;
//     console.log(`There has been ${totalRequests} requests made to the server`);
//     console.log(
//       "The last request came from: " +
//         req.protocol +
//         "://" +
//         req.get("host") +
//         req.originalUrl
//     );
//     next();
//   };

//   private mongoSetup(): void {
//     mongoose.Promise = global.Promise;
//     mongoose.connect(this.mongoUrl);
//   }

//   private config(): void {
//     // support application/json type post data
//     this.app.use(bodyParser.json());
//     //support application/x-www-form-urlencoded post data
//     this.app.use(
//       bodyParser.urlencoded({
//         extended: false
//       })
//     );
//     this.app.use(this.Logger);
//   }
// }

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
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
    const mongo_url = "mongodb://localhost/27017";
    mongoose.set("useFindAndModify", false);
    mongoose.connect(mongo_url || process.env.mongo_url, {
      useNewUrlParser: true,
      userCreateIndex: true
    });

    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(this.Logger);
  }

  private routes(): void {
    const router: express.Router = express.Router();

    this.app.use("/api/tasks", TaskRoutes);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("listening on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
