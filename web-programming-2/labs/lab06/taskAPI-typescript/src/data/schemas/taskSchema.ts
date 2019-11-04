import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  hoursEstimated: {
    type: Number
  },
  completed: {
    type: Boolean
  },
  comment: [{ name: String, comment: String }]
});
