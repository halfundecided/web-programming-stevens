const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const animals = require("./animals");
const { ObjectId } = require("mongodb");

//create, read, update, delete
module.exports = {
  async createPost(title, author, content) {
    if (
      typeof title === "undefined" ||
      typeof author === "undefined" ||
      typeof content === "undefined"
    )
      throw `arguments not provided`;
    if (title.constructor !== String) throw "No title provided";
    //object id???
    if (author.constructor !== Object) throw "invalid id";
    if (content.constructor !== String) throw "No content provided";

    const postCollection = await posts();
    const animalThatPosted = await animals.get(author);

    const newPost = {
      title: title,
      author: `${animalThatPosted.name}`,
      content: content
    };

    const insertInfo = await postCollection.insertOne(newPost);
    if (insertInfo.insertedCount === 0) throw "Could not add post";

    return await postCollection.findOne({
      _id: ObjectId(insertInfo.insertedId)
    });
  },
  async readPost(id) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `Post ${id} invalid id`;

    const postCollection = await posts();
    const parsedId = ObjectId.createFromHexString(id);
    const thisPost = await postCollection.findOne({ _id: parsedId });
    if (thisPost === null) throw "No post with this id";

    return thisPost;
  },
  async updatePost(id, newTitle, newContent) {
    if (
      typeof id === "undefined" ||
      typeof newTitle === "undefined" ||
      typeof newContent === "undefined"
    )
      throw `arguments not provided`;
    if (
      id.constructor !== String ||
      newTitle.constructor !== String ||
      newContent.constructor !== String
    )
      throw "not proper type";

    const postCollection = await posts();
    const parsedId = ObjectId.createFromHexString(id);

    const updatedPost = {
      title: newTitle,
      content: newContent
    };

    const updatedInfo = await postCollection.updateOne(
      { _id: parsedId },
      { $set: updatedPost }
    );
    if (updatedInfo.modifiedCount === 0)
      throw "could not update post successfully";

    return await this.readPost(id);
  },
  async deletePost(id) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `${id} invalid id`;

    const postCollection = await posts();
    const parsedId = ObjectId.createFromHexString(id);
    const deletionInfo = await postCollection.findOne({ _id: parsedId });
    const deletion = await postCollection.removeOne({ _id: parsedId });

    if (deletion.deletedCount === 0)
      throw `Could not delete post with id of ${id}`;

    return deletionInfo;
  }
};
