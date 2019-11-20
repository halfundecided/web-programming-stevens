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

const updateImage = async (_, args) => {
  // /* Add Unsplash Image to Bin */
  // // once the user press add to bin button, it will fire this mutation with original field(args)
  // if (args.user_posted === false && args.binned === false) {
  const binningUnsplashImage = {
    id: args.id,
    url: args.url,
    poster_name: args.author,
    description: args.description,
    user_posted: args.user_posted,
    binned: args.binned
  };
  try {
    const binnedUnsplashImage = await cacheData.addUnsplashImagetoBin(
      binningUnsplashImage
    );
    return binnedUnsplashImage;
  } catch (e) {
    console.log(e);
  }
  // }
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
