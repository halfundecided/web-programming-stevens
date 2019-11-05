const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const { ObjectId } = require("mongodb");

interface TaskForPatch {
  title?: string;
  description?: string;
  hoursEstimated?: number;
  completed?: boolean;
}

const getAll = async (skip: number, take: number): Promise<object> => {
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
  // argument check?
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
  // const newTask = updatedTask;
  // argument check?
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
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const updatedTaskData: TaskForPatch = {};
  if (taskTitle) {
    updatedTaskData.title = taskTitle;
  }
  if (taskDescription) {
    updatedTaskData.description = taskDescription;
  }
  if (taskHoursestimated) {
    updatedTaskData.hoursEstimated = taskHoursestimated;
  }
  if (typeof taskCompleted !== "undefined") {
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
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const newComment = {
    _id: null,
    name: name,
    comment: comment
  };
  newComment._id = new ObjectId();

  const insertedComment = await taskCollection.updateOne(
    { _id: parsedId },
    { $addToSet: { comments: newComment } }
  );

  if (insertedComment.modifiedCount === 0)
    throw `could not add a comment successfully`;

  return await module.exports.getTaskById(taskId);
};

const removeComment = async (taskId: string, commentId: string) => {
  const taskCollection = await tasks();
  const parsedTaskId = ObjectId.createFromHexString(taskId);
  const parsedCommentId = ObjectId.createFromHexString(commentId);

  const deletionComment = await taskCollection.findOneAndUpdate(
    { _id: parsedTaskId },
    { $pull: { comments: { _id: parsedCommentId } } }
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
