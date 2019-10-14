const bluebird = require("bluebird");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const data = require("./lab4");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const getById = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {});
  });
};

/**
 * Respond with an array of the last 20 users in the cache from the recently viewed list.
 */
app.get("/api/people/history", async (req, res) => {
  try {
  } catch (e) {}
});

app.get("/api/people/:id", async (req, res) => {
  try {
  } catch (e) {}
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
