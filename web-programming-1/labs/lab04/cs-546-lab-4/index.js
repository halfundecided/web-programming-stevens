// Mijeong Ban
// I pledge my honor that I have abided by the Stevens Honor System
const animals = require("./data/animals.js");
const conn = require("./mongoConnection");

const main = async () => {
  console.log("1. Create an animal named Sasha with the type of Dog.");

  const sasha = await animals.create("Sasha", "Dog");
  console.log(sasha);

  console.log(" ");

  console.log("2. Create an animal names Lucy, with the type of Dog.");

  const lucy = await animals.create("Lucy", "Dog");
  console.log(lucy);

  console.log(" ");

  console.log("3. Query all animals, and log them all");
  try {
    const allMyAnimals = await animals.getAll();
    console.log(allMyAnimals);
  } catch (e) {
    console.log(e);
  }
  console.log(" ");

  console.log("4. Create an animal named Duke, with a type of Walrus");
  try {
    const duke = await animals.create("Duke", "Walrus");
    console.log(duke);
  } catch (e) {
    console.log(e);
  }
  console.log(" ");

  console.log("5. Rename Sasha to Sashita");
  try {
    const sashita = await animals.rename(String(sasha._id), "Sashita");
    console.log(sashita);
  } catch (e) {
    console.log(e);
  }
  console.log(" ");

  console.log("6. Remove Lucy");
  try {
    const removeLucy = await animals.remove(String(lucy._id));
    console.log(removeLucy);
  } catch (e) {
    console.log(e);
  }

  const db = await conn();
  await db.serverConfig.close();
  await console.log("Well Done!");
};

main().catch(error => {
  console.log(error);
});
