const axios = require("axios");

const unsplashImages = async (parent, args) => {
  const ACCESS_KEY =
    "a337360e8e9063fc858f1ccdf474126575adee5c1d5f5c9447345d6d7f748bc4";
  const unsplashImgs = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
  );
  return unsplashImgs;
};

const likedImages = async (parent, args) => {};

const userPostedImages = async (parent, args) => {};

module.exports = {
  unsplashImages,
  likedImages,
  userPostedImages
};

// does all of them need to be async function?
