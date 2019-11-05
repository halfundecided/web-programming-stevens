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
module.exports = {
    getAll
};
