const uuid = require("node-uuid");
const cacheData = require("../data/redis");

const uploadImage = async (_, args) => {
  if (
    args.url.constructor !== String ||
    args.description.constructor !== String ||
    args.author.constructor !== String
  ) {
    throw `form is not valid`;
  }
  let ImagePost = {
    id: uuid.v4(),
    url: args.url,
    poster_name: args.author,
    description: args.description,
    user_posted: true,
    binned: false
  };

  try {
    const createdUserPostedImage = await cacheData.createUserPostedImage(
      ImagePost
    );
    return createdUserPostedImage;
  } catch (e) {
    console.log(e);
  }
};

const updateImage = async (_, args) => {
  const updatingImage = {
    id: args.id,
    url: args.url,
    poster_name: args.author,
    description: args.description,
    user_posted: args.user_posted,
    binned: args.binned
  };
  try {
    const updatedImage = await cacheData.updateImage(updatingImage);
    return updatedImage;
  } catch (e) {
    console.log(e);
  }
};

const deleteImage = async (_, args) => {
  try {
    const deletedUserPostedImage = await cacheData.deleteUserPostedImage(
      args.id
    );
    return deletedUserPostedImage;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  uploadImage,
  updateImage,
  deleteImage
};
