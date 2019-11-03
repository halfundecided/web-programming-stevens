import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

// export interface TaskInterface extends Document {
//     title: string;
//     description: string;
//     hoursEstimated: string;
//     completed: boolean;
//     comments:
// }

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
