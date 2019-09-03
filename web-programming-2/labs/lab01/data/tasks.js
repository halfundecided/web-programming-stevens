const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const { ObjectId } = require("mongodb");

const getAll = async (skip, take) => {};
const getTaskById = async id => {
  if (typeof id === "undefined" || id.constructor !== String)
    throw `${id} invalid id`;
  const taskCollection = await tasks();
  const parsedId = ObjectId.createFromHexString(id);
  const thisTask = await taskCollection.findOne({ _id: parsedId });
  if (thisTask === null) throw "No task found with this Id";

  return thisTask;
};

module.exports = {
  getTaskById
};
