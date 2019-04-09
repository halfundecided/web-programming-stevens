const axios = require("axios");

// returning entire object
const searchResult = async personName => {
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );

  if (typeof personName === "undefined" || personName.constructor !== String)
    throw `personName does not exist or it's not proper type`;

  // let firstName = "",
  //   lastName = "";
  let number = 0;
  let stack = [];

  for (let i = 0; i < people.data.length; i++) {
    if (
      people.data[i].firstName.includes(personName) ||
      people.data[i].lastName.includes(personName)
    ) {
      // firstName = people.data[i].firstName;
      // lastName = people.data[i].lastName;
      stack.push(people.data[i]);
      number++;
    }
    if (number > 20) {
      break;
    }
  }
  // return `${firstName} ${lastName}`;
  return stack;
};

const getDetails = async index => {
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );

  if (typeof index === "undefined" || index.constructor !== Number)
    throw `invalid person's id`;

  if (index < 0 || index >= people.data.length) throw `id is out of bound`;

  let details = {};
  for (let i = 0; i < people.data.length; i++) {
    if (people.data[i].id === index) {
      details = people.data[i];
    }
  }
  return details;
};

module.exports = {
  searchResult,
  getDetails
};
