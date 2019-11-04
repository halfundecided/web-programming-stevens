import * as mongoose from "mongoose";
import { Request, Response, RouterOptions } from "express";
import { TaskSchema } from "../models/taskModel";

const Tasks = mongoose.model("Tasks", TaskSchema);

export class TaskController {
  public async createTask(req: Request, res: Response): Promise<void> {
    let newTask = new Tasks(req.body);

    newTask.save((err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
}
