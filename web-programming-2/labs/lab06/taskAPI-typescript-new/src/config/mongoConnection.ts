const MongoClient = require("mongodb").MongoClient;
// const settings = require("./settings");
// const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true
      // useUnifiedTopology: true
    });
    _db = await _connection.db("Ban-Mijeong-CS554-Lab6");
  }
  return _db;
};