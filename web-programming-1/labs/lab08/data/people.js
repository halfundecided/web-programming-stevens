const axios = require("axios");

const searchResult = async personName => {
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );

  if (typeof personName === "undefined" || personName.constructor !== String)
    throw `personName does not exist or it's not proper type`;

  let firstName = "",
    lastName = "";

  for (let i = 0; i < people.data.length; i++) {
    if (
      people.data[i].firstName.includes(personName) ||
      people.data[i].lastName.includes(personName)
    ) {
      firstName = people.data[i].firstName;
      lastName = people.data[i].lastName;
    }
  }
  return `${firstName} ${lastName}`;
};

module.exports = {
  searchResult
};
