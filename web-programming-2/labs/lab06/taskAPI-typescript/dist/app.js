"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser"); //used to parse the form data that you pass in the request
var totalRequests = 0;
class App {
    constructor() {
        this.Logger = (req, res, next) => {
            //middleware here
            totalRequests++;
            console.log(`There has been ${totalRequests} requests made to the server`);
            console.log("The last request came from: " +
                req.protocol +
                "://" +
                req.get("host") +
                req.originalUrl);
            next();
        };
        this.app = express(); //run the express instance and store in app
        this.config();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(this.Logger);
    }
}
exports.default = new App().app;
