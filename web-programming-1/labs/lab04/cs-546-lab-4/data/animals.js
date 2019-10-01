// Mijeong Ban
// I pledge my honor that I have abided by the Stevens Honor System
const mongoCollections = require("../mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require("mongodb");

module.exports = {
  /**
   * Return to the newly created animal object, with all of the properties.
   * @param {string} name
   * @param {string} animalType
   */
  async create(name, animalType) {
    /* type checking for arguments */
    if (typeof name === "undefined" || typeof animalType === "undefined")
      throw `arguments not provided`;
    if (name.constructor !== String || animalType.constructor !== String)
      throw `Both name and animalType should be string`;

    const animalCollection = await animals();

    /* make an object for new animal */
    let newAnimal = {
      name: name,
      animalType: animalType
    };

    /* Insert to collection */
    const insertInfo = await animalCollection.insertOne(newAnimal);

    /* check if successfully inserted */
    if (insertInfo.insertedCount === 0) throw "Could not add animal";

    /* return a newly created object */
    return await animalCollection.findOne({
      _id: ObjectId(insertInfo.insertedId)
    });
  },

  /**
   * Return an array of all animals in the collection
   */
  async getAll() {
    const animalCollection = await animals();

    /* Get all items */
    const allAnimals = await animalCollection.find({}).toArray();
    return allAnimals;
  },

  /**
   * Given an id, return an animal from the database
   * @param {string} id
   */
  async get(id) {
    if (typeof id === "undefined" || id.constructor !== String)
      throw `${id} invalid id`;

    const animalCollection = await animals();
    const parsedId = ObjectId.createFromHexString(id);
    const thisAnimal = await animalCollection.findOne({ _id: parsedId });
    if (thisAnimal === null) throw "No animal with this id";

    return thisAnimal;
  },

  /**
   * Given an id, remove the animal from the database
   * @param {string} id
   */
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
  }
};
