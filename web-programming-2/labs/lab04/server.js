const bluebird = require("bluebird");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const data = require("./lab4");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", err => console.log("Redis Error:" + err));

const getById = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let index = id - 1;
      if (data[index]) {
        resolve(data[index]);
      } else {
        reject(new Error("something went wrong"));
      }
    }, 5000);
  });
};

/**
 * Respond with an array of the last 20 users in the cache from the recently viewed list.
 */
app.get("/api/people/history", async (req, res) => {
  try {
    console.log(data);
  } catch (e) {}
});

/**
 * Check if the user has a cache entry in redis. If so, render the result from that cache entry
 * If not, query the data module for the person and fail the request if they are not found, or send JSON and cache the result if they are found.
 */
app.get("/api/people/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let thisUser;
    /* Exist in cache? */
    let existed = await client.existAsync(personId);
    /* Found */
    if (existed === 1) {
      let user = await client.getAsync(userId);
      thisUser = JSON.parse(user);
    } else {
      /* Not found */
      thisUser = await data.getById(userId);
      await client.setAsync(userId, JSON.stringify(thisUser));
    }
    await client.lpush("history", JSON.stringify(thisUser));
    res.json(thisUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error occured" });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found", route: req.originalUrl });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
