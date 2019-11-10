const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const { ObjectId } = require("mongodb");

interface TaskForPatch {
  title?: string;
  description?: string;
  hoursEstimated?: number;
  completed?: boolean;
}

const getAll = async (skip?: number, take?: number): Promise<object> => {
  const taskCollection = await tasks();
  const allTasks = await taskCollection
    .find({})
    .project({ _id: 0 })
    .skip(skip)
    .limit(take)
    .toArray();
  return allTasks;
};

const getTaskById = async (id: string): Promise<object> => {
  if (typeof id === "undefined" || id.constructor !== String)
    throw `${id} invalid id`;
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(id);
  const thisTask = await taskCollection.findOne({ _id: parsedId });
  if (thisTask == null) throw "No task found with this Id";

  return thisTask;
};

const createTask = async (
  title: string,
  description: string,
  hoursEstimated: number
): Promise<object> => {
  if (
    typeof title === "undefined" ||
    typeof description === "undefined" ||
    typeof hoursEstimated === "undefined"
  )
    throw `one or more of arguments not provided`;
  if (title.constructor !== String) throw `Invalid title`;
  if (description.constructor !== String) throw `Invalid description`;
  if (hoursEstimated.constructor !== Number) throw `Invalid estimated hours`;

  const taskCollection = await tasks();

  const newTask = {
    title: title,
    description: description,
    hoursEstimated: hoursEstimated,
    completed: false,
    comments: []
  };

  const insertInfo = await taskCollection.insertOne(newTask);
  if (insertInfo.insertedCount === 0) throw `Could not add a new task`;

  return await taskCollection.findOne({
    _id: ObjectId(insertInfo.insertedId)
  });
};

// better way to write using interface?
const updateTask = async (
  taskId: string,
  taskTitle: string,
  taskDescription: string,
  taskHoursEstimated: number,
  taskCompleted: boolean
): Promise<object> => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  if (
    typeof taskTitle === "undefined" ||
    typeof taskDescription === "undefined" ||
    typeof taskHoursEstimated === "undefined" ||
    typeof taskCompleted === "undefined"
  )
    throw `You should provide all details (completed as well)`;

  if (
    taskTitle.constructor !== String ||
    taskDescription.constructor !== String ||
    taskHoursEstimated.constructor !== Number ||
    taskCompleted.constructor !== Boolean
  )
    throw `You should provide a proper input`;

  const originalTask = await module.exports.getTaskById(taskId);
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const updatedTaskData = {
    title: taskTitle,
    description: taskDescription,
    hoursEstimated: taskHoursEstimated,
    completed: taskCompleted,
    comments: originalTask.comments
  };

  const updatedInfo = await taskCollection.updateOne(
    { _id: parsedId },
    { $set: updatedTaskData }
  );

  if (updatedInfo.modifiedCount === 0)
    throw "could not update task successfully";

  return await module.exports.getTaskById(taskId);
};

const updateTaskForPatch = async (
  taskId: string,
  taskTitle?: string,
  taskDescription?: string,
  taskHoursestimated?: number,
  taskCompleted?: boolean
): Promise<object> => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const updatedTaskData: TaskForPatch = {};
  if (taskTitle) {
    if (taskTitle.constructor !== String)
      throw `You should provide a proper input type`;
    updatedTaskData.title = taskTitle;
  }
  if (taskDescription) {
    if (taskDescription.constructor !== String)
      throw `You should provide a proper input type`;
    updatedTaskData.description = taskDescription;
  }
  if (taskHoursestimated) {
    if (taskHoursestimated.constructor !== Number)
      throw `You should provide a proper input type`;
    updatedTaskData.hoursEstimated = taskHoursestimated;
  }
  if (typeof taskCompleted !== "undefined") {
    if (taskCompleted.constructor !== Boolean)
      throw `You should provide a proper input type`;
    updatedTaskData.completed = taskCompleted;
  }

  const updatedInfo = await taskCollection.updateOne(
    { _id: parsedId },
    { $set: updatedTaskData }
  );

  if (updatedInfo.modifiedCount === 0)
    throw `could not update(patch) task successfully`;

  return await module.exports.getTaskById(taskId);
};

const addComment = async (
  taskId: string,
  name: string,
  comment: string
): Promise<object> => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  if (typeof name === "undefined" || typeof comment === "undefined")
    throw `one or more of arguments not provided`;

  if (name.constructor !== String) throw `invalid name`;
  if (comment.constructor !== String) throw `invalid comment`;

  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const newComment = {
    id: null,
    name: name,
    comment: comment
  };
  newComment.id = new ObjectId();

  const insertedComment = await taskCollection.updateOne(
    { _id: parsedId },
    { $addToSet: { comments: newComment } }
  );

  if (insertedComment.modifiedCount === 0)
    throw `could not add a comment successfully`;

  return await module.exports.getTaskById(taskId);
};

const removeComment = async (taskId: string, commentId: string) => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid task id`;
  if (typeof commentId === "undefined" || commentId.constructor !== String)
    throw `You should provide a valid comment id`;
  const taskCollection = await tasks();
  const parsedTaskId = ObjectId.createFromHexString(taskId);
  const parsedCommentId = ObjectId.createFromHexString(commentId);

  const deletionComment = await taskCollection.findOneAndUpdate(
    { _id: parsedTaskId },
    { $pull: { comments: { id: parsedCommentId } } }
  );

  if (deletionComment.deletedCount === 0) {
    throw "Could not remove comment.";
  }
  return deletionComment;
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  updateTaskForPatch,
  addComment,
  removeComment
};
