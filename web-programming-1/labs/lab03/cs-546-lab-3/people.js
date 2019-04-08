const axios = require("axios");
 
/* Returns the person at a specified index within the people.json array */
const getPersonById = async index => {
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  // Check if the index exists as is of proper type
  if (typeof index === "undefined" || index.constructor !== Number) {
    throw "index doesn't exist or it's not a number";
  }
  // Check if the index is within bounds
  if (index < 0 || index >= people.data.length) {
    throw "index is not within bounds";
  }

  let firstName = "", lastName = "";

  for (let i = 0; i < people.data.length; i++) {
    if (people.data[i].id === index) {
      firstName = people.data[i].firstName;
      lastName = people.data[i].lastName;
    }
  }
  return `${firstName} ${lastName}`
};

/* Get the sorted lexographic of all the people by their last name, then return the person's full name at the index specified by the argument index */
const lexIndex = async index => {
  let firstName = 0,
    lastName = 0;
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  // Check if the index exists as is of proper type
  if (typeof index === "undefined" || index.constructor !== Number) {
    throw "index doesn't exist or it's not a number";
  }
  // Check if the index is within bounds
  if (index < 0 || index >= people.data.length) {
    throw "index is not within bounds";
  }

  let sortedNames = [];
  for (let i = 0; i < people.data.length; i++) {
    sortedNames.push(people.data[i].lastName);
  }
  sortedNames = sortedNames.sort();
  lastName = sortedNames[index];
  for (i = 0; i < people.data.length; i++) {
    if (people.data[i].lastName === lastName) {
      firstName = people.data[i].firstName;
    }
  }
  return `${firstName} ${lastName}`;
};

/* Using just the first names, collect and return the metrics */
const firstNameMetrics = async () => {
  let letterSum = 0;
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  // totalLetters
  for (let i = 0; i < people.data.length; i++) {
    letterSum += people.data[i].firstName.length;
  }

  let totalVowels = 0;
  let total = 0;

  for (object in people.data) {
    object = people.data[object];
    for (letter in object.firstName) {
      letter = object.firstName[letter];
      if (
        letter === "a" ||
        letter === "e" ||
        letter === "i" ||
        letter === "o" ||
        letter === "u" ||
        letter === "A" ||
        letter === "E" ||
        letter === "I" ||
        letter === "O" ||
        letter === "U"
      ) {
        totalVowels += 1;
      }
    }
  }
  let totalConsonants = letterSum - totalVowels;

  // making the array of all first names
  let firstNameArray = [];
  for (i = 0; i < people.data.length; i++) {
    firstNameArray.push(people.data[i].firstName);
  }

  // longestName
  const longestName = firstNameArray.reduce(function(prev, next) {
    return prev.length > next.length ? prev : next;
  });

  // shortestName
  const shortestName = firstNameArray.reduce(function(prev, next) {
    return prev.length <= next.length ? prev : next;
  });

  return metrix = {
      totalLetter: letterSum,
      totalVowels: totalVowels,
      totalConsonants: totalConsonants,
      longestName: longestName,
      shortestName: shortestName
  };
};

module.exports = {
  getPersonById,
  lexIndex,
  firstNameMetrics
};
