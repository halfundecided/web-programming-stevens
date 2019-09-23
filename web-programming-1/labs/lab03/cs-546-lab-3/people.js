const axios = require("axios");

/**
 * Return the person at for the specified id within the people.json array
 * @param {number} index
 */
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

  let firstName = "",
    lastName = "";

  for (let i = 0; i < people.data.length; i++) {
    if (people.data[i].id === index) {
      firstName = people.data[i].firstName;
      lastName = people.data[i].lastName;
    }
  }
  return `${firstName} ${lastName}`;
};

/**
 * For this function, you must get the sorted lexographic(alphabetical) order of all the people by their last name.
 * Then, return the person's full name at the index specified by the argument index.
 * @param {number} index
 */
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

  // push each last name into sortedNames array
  for (let i = 0; i < people.data.length; i++) {
    sortedNames.push(people.data[i].lastName);
  }

  // sort last names
  sortedNames = sortedNames.sort();

  // get the last name with that index
  lastName = sortedNames[index];

  // loop through data array and compare with the selected lastname to get first name as well
  for (i = 0; i < people.data.length; i++) {
    if (people.data[i].lastName === lastName) {
      firstName = people.data[i].firstName;
    }
  }
  return `${firstName} ${lastName}`;
};

/**
 * Using just the first names of all the people in people.json, collect and return the following metrics
 * {
 *    totalLetters: sum of all the letters in all the firstNames,
 *    totalVowels: sum of all the vowels in all the firstNames,
 *    totalConsonants: sum of all the consonants in all the firstNames,
 *    longestName: the longest firstName in the list,
 *    shortestName: the shortest firstName in the list
 * }
 */
const firstNameMetrics = async () => {
  let letterSum = 0;
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  // totalLetters by adding up each firstName length
  for (let i = 0; i < people.data.length; i++) {
    letterSum += people.data[i].firstName.length;
  }

  let totalVowels = 0;

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

  return (metrix = {
    totalLetter: letterSum,
    totalVowels: totalVowels,
    totalConsonants: totalConsonants,
    longestName: longestName,
    shortestName: shortestName
  });
};

module.exports = {
  getPersonById,
  lexIndex,
  firstNameMetrics
};
