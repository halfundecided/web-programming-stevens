const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const animals = data.animals;
const posts = data.posts;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const mj = await animals.create("mijeong", "rabbit");
  const id = mj._id;
  //   console.log(typeof id);

  //   await posts.createPost("Hello, World!", id, "This is test");

  console.log("Done seeding database");
  await db.serverConfig.close();
  await console.log("done!");
};

main().catch(error => {
  console.log(error);
});
