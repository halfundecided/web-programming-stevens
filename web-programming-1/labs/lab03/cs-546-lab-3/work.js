const axios = require("axios");

/**
 * Given a first and last name, find the person in the people.json array, then,
 * if they are found, get their SSN and find out where they work from work.json.
 * Then. print their full name, company, job title and if they will be fired.
 * You can assume that the data corresponding to a person's SSN always exists in work.json
 * @param {string} firstName
 * @param {string} lastName
 */
const whereDoTheyWork = async (firstName, lastName) => {
  if (
    typeof firstName === "undefined" ||
    typeof lastName === "undefined" ||
    firstName.constructor !== String ||
    lastName.constructor !== String
  ) {
    throw "The arguments don't exist or not of the proper type";
  }
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  const work = await axios.get(
    "https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json"
  );

  let found = 0;
  let SSN = "",
    company = "",
    titleOfJob = "",
    fired = "";

  // find that person and his/her SSN
  for (object in people.data) {
    if (
      people.data[object].firstName === firstName &&
      people.data[object].lastName === lastName
    ) {
      found = 1;
      SSN = people.data[object].ssn;
    }
  }

  if (found === 0) {
    throw `There is no ${firstName} ${lastName}`;
  }

  for (object in work.data) {
    if (work.data[object].ssn === SSN) {
      company = work.data[object].company;
      titleOfJob = work.data[object].jobTitle;
      fired = work.data[object].willBeFired;
    }
  }

  if (fired === true)
    return `${firstName} ${lastName} - ${titleOfJob} at ${company}. They will be fired.`;
  else
    return `${firstName} ${lastName} - ${titleOfJob} at ${company}. They will not be fired.`;
};

/**
 * Someone is hacking company records, and your boss found their IP Address.
 * Find the hacker using IP address
 * @param {string} ip
 */
const findTheHacker = async ip => {
  if (typeof ip === "undefined" || ip.constructor !== String) {
    throw "The argument doesn't exist or is not of the proper type";
  }
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  const work = await axios.get(
    "https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json"
  );

  let found = 0;
  let SSN = "",
    firstName = "",
    lastName = "";

  for (object in work.data) {
    if (work.data[object].ip === ip) {
      found = 1;
      SSN = work.data[object].ssn;
    }
  }

  if (found === 0) {
    throw `There is no one with this ip address: ${ip}`;
  }

  for (object in people.data) {
    if (people.data[object].ssn === SSN) {
      firstName = people.data[object].firstName;
      lastName = people.data[object].lastName;
    }
  }

  return `${firstName} ${lastName} is the hacker!`;
};

module.exports = {
  whereDoTheyWork,
  findTheHacker
};
