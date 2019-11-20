const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const POST_CACHE_KEY = "post";

/* User-Posted Image Collection */
const createUserPostedImage = async obj => {
  await client.hsetAsync(POST_CACHE_KEY, obj.id, JSON.stringify(obj));
  const uploadedPost = await client.hgetAsync(POST_CACHE_KEY, obj.id);
  return JSON.parse(uploadedPost);
};

const readUserPostedImageById = async id => {
  const userPostedImage = await client.hgetAsync(POST_CACHE_KEY, obj.id);
  return JSON.parse(userPostedImage);
};

const readAllUserPostedImages = async () => {
  const userPostedImages = await client.hgetallAsync(POST_CACHE_KEY);
  return Object.values(userPostedImages).map(p => JSON.parse(p));
};

const deleteUserPostedImage = async id => {
  const deletedPost = await client.hgetAsync(POST_CACHE_KEY, id);
  await client.hdelAsync(POST_CACHE_KEY, id);
  return JSON.parse(deletedPost);
};

const getBinnedImages = async () => {};

module.exports = {
  createUserPostedImage,
  readUserPostedImageById,
  readAllUserPostedImages,
  updateUserPostedImage,
  deleteUserPostedImage
};
