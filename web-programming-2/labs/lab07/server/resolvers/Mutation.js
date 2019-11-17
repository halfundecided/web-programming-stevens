const uuid = require("node-uuid");
const cacheData = require("../data/redis");

const uploadImage = async (_, args) => {
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

const updateImage = async (_, args) => {};

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
