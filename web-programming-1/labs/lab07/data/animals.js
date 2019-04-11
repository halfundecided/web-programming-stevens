const mongoCollections = require("../config/mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require("mongodb");

module.exports = {
  async create(name, animalType) {
    if (
      typeof name === "undefined" ||
      typeof animalType === "undefined"
      // typeof likes === "undefined"
    )
      throw `arguments not provided`;
    if (
      name.constructor !== String ||
      animalType.constructor !== String
      // likes.constructor !== Array
    )
      throw `Both name and animalType should be string`;

    const animalCollection = await animals();

    let newAnimal = {
      name: name,
      animalType: animalType,
      likes: [],
      posts: []
    };

    const insertInfo = await animalCollection.insertOne(newAnimal);
    if (insertInfo.insertedCount === 0) throw "Could not add animal";
    return await animalCollection.findOne({
      _id: ObjectId(insertInfo.insertedId)
    });
  },
  async getAll() {
    const animalCollection = await animals();

    const allAnimals = await animalCollection.find({}).toArray();
    return allAnimals;
  },
  async get(id) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `${id} invalid id`;

    const animalCollection = await animals();
    const parsedId = ObjectId.createFromHexString(id);
    const thisAnimal = await animalCollection.findOne({ _id: parsedId });
    if (thisAnimal === null) throw "No animal with this id";

    return thisAnimal;
  },
  async remove(id) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `${id} invalid id`;

    const animalCollection = await animals();
    const parsedId = ObjectId.createFromHexString(id);
    const deletionInfo = await animalCollection.findOne({ _id: parsedId });
    const deletion = await animalCollection.removeOne({ _id: parsedId });

    if (deletion.deletedCount === 0)
      throw `Could not delete animal with id of ${id}`;

    return deletionInfo;
  },
  async rename(id, newName) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `${id} invalid id`;
    if (typeof newName === "undefined" || newName.constructor !== String)
      throw `not proper name`;

    const animalCollection = await animals();
    const parsedId = ObjectId.createFromHexString(id);
    const renamedAnimal = {
      name: newName
    };

    const renamedInfo = await animalCollection.updateOne(
      { _id: parsedId },
      { $set: renamedAnimal }
    );
    if (renamedInfo.modifiedCount === 0)
      throw "could not rename animal successfully";

    return await this.get(id);
  },
  async addPostToUser(userId, postId, postTitle) {
    if (
      typeof userId === "undefined" ||
      typeof postId === "undefined" ||
      typeof postTitle === "undefined"
    )
      throw `arguments not provided`;
    if (
      userId.constructor !== String ||
      postId.constructor !== String ||
      postTitle.constructor !== String
    )
      throw `invalid arguments`;

    const animalCollection = await animals();
    const parsedUserId = ObjectId.createFromHexString(userId);
    const parsedPostId = ObjectId.createFromHexString(postId);
    const addPost = {
      posts: {
        id: parsedPostId,
        title: postTitle
      }
    };
    const updatedUserWithPost = await animalCollection.updateOne(
      { _id: parsedUserId },
      { $addToSet: addPost }
    );
    if (updatedUserWithPost.modifiedCount === 0)
      throw "could not add the post successfully";

    return await this.get(id);
  },
  async removePostFromUser(userId, postId) {
    if (typeof userId === "undefined" || typeof postId === "undefined")
      throw `arguments not provided`;
    if (userId.constructor !== String || postId.constructor !== String)
      throw `invalid arguments`;

    const animalCollection = await animals();
    const parsedUserId = ObjectId.createFromHexString(userId);
    const parsedPostId = ObjectId.createFromHexString(postId);
    const removePost = {
      posts: {
        id: parsedPostId
      }
    };
    const updatedUserWithPost = await animalCollection.updateOne(
      { _id: parsedUserId },
      { $pull: removePost }
    );
    if (updatedUserWithPost.modifiedCount === 0)
      throw "could not remove the post successfully";

    return await this.get(id);
  }
};
