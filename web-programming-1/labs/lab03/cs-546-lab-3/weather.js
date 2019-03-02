const axios = require("axios");

const shouldTheyGoOutside = async (firstName, lastName) => {
    if (typeof firstName === "undefined" || typeof lastName === "undefined" || firstName.constructor !== String || lastName.constructor !== String) {
        throw "The arguments don't exist or not of the proper type";
    }
  const people = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  const weather = await axios.get(
    "https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json"
  );

  let zipcode = "";
  let temperature = 0;
  let found = 0;

for(object in people.data) {
    if(people.data[object].firstName === firstName && people.data[object].lastName === lastName){
        found = 1;
        zipcode = people.data[object].zip;
    }
}

if(found === 0) {
    throw `There is no ${firstName} ${lastName}`;
}

for(object in weather.data) {
    if(weather.data[object].zip === zipcode) {
        temperature = weather.data[object].temp;
    }
}

if(temperature >= 34.00)
    return `Yes, ${firstName} should go outside.`
else 
    return `No, ${firstName} should not go outside.`
};



module.exports = {
    shouldTheyGoOutside,
}