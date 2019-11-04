import * as mongoose from "mongoose";
import { TaskSchema } from "../schemas/taskSchema";

const Task = mongoose.model("Task", TaskSchema);

const createTask = async (
  title: String,
  description: String,
  hoursEstimated: Number
) => {
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    hoursEstimaed: hoursEstimated,
    completed: false,
    comments: []
  });

  await newTask.save(err => {
    if (err) throw err;
    console.log("New Task successfully added.");
  });
};

module.exports = {
  createTask
};
