<<<<<<< HEAD
import * as mongoose from "mongoose";
import { TaskSchema } from "../data/schemas/taskSchema";

import { Request, Response } from "express";

const Task = mongoose.model("Task", TaskSchema);

export class Tasks {
  public routes(app): void {
    app.route("/api/tasks").post((req: Request, res: Response) => {
      const taskInfo = req.body;
      res.status(200).send(taskInfo);
    });
=======
import { Router, Request, Response } from "express";
// import TaskModel from "../models/taskModel";
import { TaskController } from "../controllers/tasks";

export class TaskRouter {
  public taskController: TaskController = new TaskController();

  public routes(app): void {
    // app.route("/").get((req: Request, res: Response) => {
    //   res.status(200).send({
    //     message: "GET request successfull!"
    //   });
    // });

    app.route("/api/tasks").post(this.taskController.createTask);
>>>>>>> e38ad1748121d0f82ef3d838b51ffebdef6562b8
  }
}
