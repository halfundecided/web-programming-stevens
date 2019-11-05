var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const { ObjectId } = require("mongodb");
const getAll = (skip, take) => __awaiter(this, void 0, void 0, function* () {
    const taskCollection = yield tasks();
    const allTasks = yield taskCollection
        .find({})
        .project({ _id: 0 })
        .skip(skip)
        .limit(take)
        .toArray();
    return allTasks;
});
const getTaskById = (id) => __awaiter(this, void 0, void 0, function* () {
    const taskCollection = yield tasks();
    const parsedId = ObjectId.createFromHexString(id);
    const thisTask = yield taskCollection.findOne({ _id: parsedId });
    if (thisTask == null)
        throw "No task found with this Id";
    return thisTask;
});
const createTask = (title, description, hoursEstimated) => __awaiter(this, void 0, void 0, function* () {
    // argument check?
    const taskCollection = yield tasks();
    const newTask = {
        title: title,
        description: description,
        hoursEstimated: hoursEstimated,
        completed: false,
        comments: []
    };
    const insertInfo = yield taskCollection.insertOne(newTask);
    if (insertInfo.insertedCount === 0)
        throw `Could not add a new task`;
    return yield taskCollection.findOne({
        _id: ObjectId(insertInfo.insertedId)
    });
});
// better way to write using interface?
const updateTask = (taskId, taskTitle, taskDescription, taskHoursEstimated, taskCompleted) => __awaiter(this, void 0, void 0, function* () {
    // const newTask = updatedTask;
    // argument check?
    const originalTask = yield module.exports.getTaskById(taskId);
    const taskCollection = yield tasks();
    const parsedId = ObjectId.createFromHexString(taskId);
    const updatedTaskData = {
        title: taskTitle,
        description: taskDescription,
        hoursEstimated: taskHoursEstimated,
        completed: taskCompleted,
        comments: originalTask.comments
    };
    const updatedInfo = yield taskCollection.updateOne({ _id: parsedId }, { $set: updatedTaskData });
    if (updatedInfo.modifiedCount === 0)
        throw "could not update task successfully";
    return yield module.exports.getTaskById(taskId);
});
const updateTaskForPatch = (taskId, taskTitle, taskDescription, taskHoursestimated, taskCompleted) => __awaiter(this, void 0, void 0, function* () {
    const taskCollection = yield tasks();
    const parsedId = ObjectId.createFromHexString(taskId);
    const updatedTaskData = {};
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
    const updatedInfo = yield taskCollection.updateOne({ _id: parsedId }, { $set: updatedTaskData });
    if (updatedInfo.modifiedCount === 0)
        throw `could not update(patch) task successfully`;
    return yield module.exports.getTaskById(taskId);
});
const addComment = (taskId, name, comment) => __awaiter(this, void 0, void 0, function* () {
    const taskCollection = yield tasks();
    const parsedId = ObjectId.createFromHexString(taskId);
    const newComment = {
        _id: null,
        name: name,
        comment: comment
    };
    newComment._id = new ObjectId();
    const insertedComment = yield taskCollection.updateOne({ _id: parsedId }, { $addToSet: { comments: newComment } });
    if (insertedComment.modifiedCount === 0)
        throw `could not add a comment successfully`;
    return yield module.exports.getTaskById(taskId);
});
const removeComment = (taskId, commentId) => __awaiter(this, void 0, void 0, function* () {
    const taskCollection = yield tasks();
    const parsedTaskId = ObjectId.createFromHexString(taskId);
    const parsedCommentId = ObjectId.createFromHexString(commentId);
    const deletionComment = yield taskCollection.findOneAndUpdate({ _id: parsedTaskId }, { $pull: { comments: { _id: parsedCommentId } } });
    if (deletionComment.deletedCount === 0) {
        throw "Could not remove comment.";
    }
    return deletionComment;
});
module.exports = {
    getAll,
    getTaskById,
    createTask,
    updateTask,
    updateTaskForPatch,
    addComment,
    removeComment
};
