const axios = require("axios");

const unsplashImages = async (_, args) => {
  let ImagePost = [];
  const imageData = await axios.get(
    `https://api.unsplash.com/photos/?client_id=a337360e8e9063fc858f1ccdf474126575adee5c1d5f5c9447345d6d7f748bc4&page=${args.pageNum}`
  );

  console.log(imageData.data);
  imageData.data.forEach(element =>
    ImagePost.push({
      id: element.id,
      url: element.urls.regular,
      poster_name: element.user.name,
      description: element.description,
      user_posted: false,
      binned: false
    })
  );
  return ImagePost;
};

const likedImages = async (parent, args) => {};

const userPostedImages = async (parent, args) => {};

module.exports = {
  unsplashImages,
  likedImages,
  userPostedImages
};

// does all of them need to be async function?
