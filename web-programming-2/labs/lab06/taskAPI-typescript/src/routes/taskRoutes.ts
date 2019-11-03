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
  }
}
