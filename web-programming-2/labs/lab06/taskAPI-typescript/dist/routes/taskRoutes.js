"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const taskSchema_1 = require("../data/schemas/taskSchema");
const Task = mongoose.model("Task", taskSchema_1.TaskSchema);
class Tasks {
    routes(app) {
        app.route("/api/tasks").post((req, res) => {
            const taskInfo = req.body;
            console.log(taskInfo);
        });
    }
}
exports.Tasks = Tasks;
