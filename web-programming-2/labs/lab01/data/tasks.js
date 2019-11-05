const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const { ObjectId } = require("mongodb");

const getAll = async (skip, take) => {
  const taskCollection = await tasks();
  const allTasks = await taskCollection
    .find({})
    .project({ _id: 0 })
    .skip(skip)
    .limit(take)
    .toArray();
  console.log(typeof allTasks);
  return allTasks;
};

/**
 * Get the task with the supplied ID
 * @param {objectId} id
 */
const getTaskById = async id => {
  if (typeof id === "undefined" || id.constructor !== String)
    throw `${id} invalid id`;
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(id);
  const thisTask = await taskCollection.findOne({ _id: parsedId });
  if (thisTask === null) throw "No task found with this Id";

  return thisTask;
};

/**
 * Create a task
 * @param {string} title
 * @param {string} description
 * @param {number} hoursEstimated
 * @param {boolean} completed
 */
const createTask = async (title, description, hoursEstimated) => {
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

/**
 * Update the task with the supplied ID: must provide all details of the new state of the object
 * @param {ObjectId} taskId
 * @param {Object} updatedTask
 */
const updateTask = async (taskId, updatedTask) => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  if (
    !updatedTask.title ||
    !updatedTask.description ||
    !updatedTask.hoursEstimated ||
    typeof updatedTask.completed === "undefined"
  )
    throw `You should provide all details (completed as well)`;

  if (
    updatedTask.title.constructor !== String ||
    updatedTask.description.constructor !== String ||
    updatedTask.hoursEstimated.constructor !== Number ||
    updatedTask.completed.constructor !== Boolean
  )
    throw `You should provide a proper input`;

  const originalTask = await module.exports.getTaskById(taskId);
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const updatedTaskData = {
    title: updatedTask.title,
    description: updatedTask.description,
    hoursEstimated: updatedTask.hoursEstimated,
    completed: updatedTask.completed,
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

/**
 * Update the task with the supplied ID: only provide deltas of the value to update
 * @param {ObjectId} taskId
 * @param {ObjectId} updatedTask
 */
const updateTaskForPatch = async (taskId, updatedTask) => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const updatedTaskData = {};
  if (updatedTask.title) {
    if (updatedTask.title.constructor !== String)
      throw `You should provide a proper input type`;
    updatedTaskData.title = updatedTask.title;
  }
  if (updatedTask.description) {
    if (updatedTask.description.constructor !== String)
      throw `You should provide a proper input type`;
    updatedTaskData.description = updatedTask.description;
  }
  if (updatedTask.hoursEstimated) {
    if (updatedTask.hoursEstimated.constructor !== Number)
      throw `You should provide a proper input type`;
    updatedTaskData.hoursEstimated = updatedTask.hoursEstimated;
  }
  if (typeof updatedTask.completed !== "undefined") {
    if (updatedTask.completed.constructor !== Boolean)
      throw `You should provide a proper input type`;
    updatedTaskData.completed = updatedTask.completed;
  }

  const updatedInfo = await taskCollection.updateOne(
    { _id: parsedId },
    { $set: updatedTaskData }
  );

  if (updatedInfo.modifiedCount === 0)
    throw `could not update(patch) task successfully`;

  return await module.exports.getTaskById(taskId);
};

/**
 *
 * @param {ObjectId} taskId
 * @param {string} name
 * @param {string} comment
 */
const addComment = async (taskId, name, comment) => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid id`;

  if (typeof name === "undefined" || typeof comment === "undefined")
    throw `one or more of arguments not provided`;

  if (name.constructor !== String) throw `invalid name`;
  if (comment.constructor !== String) throw `invalid comment`;

  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(taskId);

  const newComment = {
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

const removeComment = async (taskId, commentId) => {
  if (typeof taskId === "undefined" || taskId.constructor !== String)
    throw `You should provide a valid task id`;
  if (typeof commentId === "undefined" || commentId.constructor !== String)
    throw `You should provide a valid comment id`;

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
