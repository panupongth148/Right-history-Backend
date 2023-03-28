const mongoose = require("mongoose");
require('dotenv').config()



const uri = process.env.MONGO_HOST;
const options = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

module.exports = mongoose.connect(uri, options);

