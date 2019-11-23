const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const POST_CACHE_KEY = "post";

// Mutation: uploadImage
const createUserPostedImage = async obj => {
  await client.hsetAsync(POST_CACHE_KEY, obj.id, JSON.stringify(obj));
  const uploadedPost = await client.hgetAsync(POST_CACHE_KEY, obj.id);
  return JSON.parse(uploadedPost);
};

// Query: userpostedImages
const readAllUserPostedImages = async () => {
  const userPostedImages = await client.hgetallAsync(POST_CACHE_KEY);
  return Object.values(userPostedImages).map(p => JSON.parse(p));
};

const updateImage = async obj => {
  /* Case1: / route */
  if (obj.user_posted === false) {
    /* Add to bin */
    if (obj.binned === true) {
      await client.hsetAsync(POST_CACHE_KEY, obj.id, JSON.stringify(obj));
      const binnedUnsplashPost = await client.hgetAsync(POST_CACHE_KEY, obj.id);
      return JSON.parse(binnedUnsplashPost);
    }
    /* Remove from bin */
    if (obj.binned === false) {
      const unbinnedUnsplashPost = await client.hgetAsync(
        POST_CACHE_KEY,
        obj.id
      );
      await client.hdelAsync(PointerEvent, obj.id);
      return JSON.parse(unbinnedUnsplashPost);
    }
  }

  /* Case2: /my-posts route */
  if (obj.user_posted === true) {
    await client.hsetAsync(POST_CACHE_KEY, obj.id, JSON.stringify(obj));
    const updatedPost = await client.hgetAsync(POST_CACHE_KEY, obj.id);
    return JSON.parse(updatedPost);
  }
};

// Mutation: deleteImage
const deleteUserPostedImage = async id => {
  const deletedPost = await client.hgetAsync(POST_CACHE_KEY, id);
  await client.hdelAsync(POST_CACHE_KEY, id);
  return JSON.parse(deletedPost);
};

// Query: binnedImages
const getAllBinnedImages = async () => {
  const userPostedImages = await client.hgetallAsync(POST_CACHE_KEY);
  let binnedImages = [];
  allImageArr = Object.values(userPostedImages).map(p => JSON.parse(p));
  allImageArr.forEach(element => {
    if (element.binned === true) {
      binnedImages.push(element);
    }
  });
  return binnedImages;
};

module.exports = {
  createUserPostedImage,
  readAllUserPostedImages,
  updateImage,
  deleteUserPostedImage,
  getAllBinnedImages
};
