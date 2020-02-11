// Mijeong Ban
// I pledge my honor that I have abided by the Stevens Honor System 
const conn = require("./mongoConnection");

const getCollectionFn = collection => {
  let _col = undefined;
  
  return async () => {
    if (!_col) {
      const db = await conn();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  animals: getCollectionFn("animals")
};