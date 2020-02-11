const mongoCollections = require("../config/mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require("mongodb");

const addLikes = async (animalId, postId) => {
  if (typeof animalId === "undefined" || typeof postId === "undefined")
    throw `arguments not provided`;
  if (animalId.constructor !== String || postId.constructor !== Object)
    throw `invalid arguments`;
  const animalCollection = await animals();
  const parsedUserId = ObjectId.createFromHexString(animalId);
  const addLikes = await animalCollection.updateOne(
    { _id: parsedUserId },
    { $push: { likes: postId } }
  );

  if (addLikes.modifiedCount === 0) {
    throw `could not add likes successfully`;
  }
  return 0;
};

const removeLikes = async (animalId, postId) => {
  if (typeof animalId === "undefined" || typeof postId === "undefined")
    throw `arguments not provided`;
  if (animalId.constructor !== String || postId.constructor !== Object)
    throw `invalid arguments`;
  const animalCollection = await animals();
  const parsedUserId = ObjectId.createFromHexString(animalId);
  const LikedPosts = {
    likes: postId
  };
  const removeLikes = await animalCollection.updateOne(
    { _id: parsedUserId },
    { $pull: { likes: postId } }
  );
  if (removeLikes.modifiedCount === 0) {
    throw `could not add likes successfully`;
  }

  return 0;
};
module.exports = {
  addLikes,
  removeLikes
};
