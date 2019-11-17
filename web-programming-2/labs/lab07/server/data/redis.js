const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const POST_CACHE_KEY = "post";
const BIN_CACHE_KEY = "bin";

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

const updateUserPostedImage = async id => {};

const deleteUserPostedImage = async id => {
  const deletedPost = await client.hgetAsync(POST_CACHE_KEY, id);
  await client.hdelAsync(POST_CACHE_KEY, id);
  return JSON.parse(deletedPost);
};

/* Binned Image Collection */

module.exports = {
  createUserPostedImage,
  readUserPostedImageById,
  readAllUserPostedImages,
  updateUserPostedImage,
  deleteUserPostedImage
};
