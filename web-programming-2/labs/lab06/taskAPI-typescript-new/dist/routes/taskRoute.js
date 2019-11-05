"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data");
const tasksData = data.tasks;
class Tasks {
    routes(app) {
        /**
         * GET /api/tasks
         * Shows a list of tasks
         * By default, it will show the first 20 tasks in the collection.
         * If a querystring variable ?skip=n is provided, you will skip the first n tasks.
         * If a querystring variable ?take=y is provided, it will show y number of results.
         * By default, the route will show up to 20 tasks; at most it will show 100 tasks.
         */
        app.route("/api/tasks").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let skipinRoute = 0;
            let takeinRoute = 0;
            if (!req.query.skip) {
                skipinRoute = 0;
            }
            else {
                skipinRoute = parseInt(req.query.skip);
            }
            if (!req.query.take) {
                takeinRoute = 20;
            }
            else {
                takeinRoute = parseInt(req.query.take);
                if (takeinRoute < 0) {
                    takeinRoute = 20;
                }
                if (takeinRoute > 100) {
                    takeinRoute = 100;
                }
            }
            try {
                const allTask = yield tasksData.getAll(skipinRoute, takeinRoute);
                res.json(allTask);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500).json({ error: e });
            }
        }));
    }
}
exports.Tasks = Tasks;
