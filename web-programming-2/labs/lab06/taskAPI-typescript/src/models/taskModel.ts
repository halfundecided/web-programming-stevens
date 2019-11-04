import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  title: {
    type: String
    // required: "Enter a title"
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
  comments: [
    {
      name: String,
      comment: String
    }
  ]
});
