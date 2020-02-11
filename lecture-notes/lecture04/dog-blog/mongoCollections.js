const dbConnection = require("./mongoConnection");

// Allow you to have one reference to each collection per app 
const getCollectionFn = collection => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await dbConnection();
        _col = await db.collection(collection);
      }
  
      return _col;
    };
  };

// Listing your collections here 
module.exports = {
    posts: getCollectionFn("posts"),
    dogs: getCollectionFn("dogs")
};