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
  }
}
