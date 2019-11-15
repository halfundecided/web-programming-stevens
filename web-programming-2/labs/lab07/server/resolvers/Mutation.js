const redis = require("redis");
const uuid = require("node-uuid");
const client = redis.createClient();

client.on("connect", function() {
  console.log("Connected to Redis🛹");
});

const uploadImage = async (parent, args) => {
  let ImagePost = {
    id: uuid.v4(),
    url: args.url,
    poster_name: args.author,
    description: args.description,
    user_posted: true,
    binned: false
  };
  try {
  } catch (e) {}
};

const updateImage = async (parent, args) => {};

const deleteImage = async (parent, args) => {};

module.exports = {
  uploadImage,
  updateImage,
  deleteImage
};
