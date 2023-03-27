const mongoose = require("mongoose");
// require('dotenv').config()

const uri = "mongodb+srv://cluster0.p3z4ncq.mongodb.net/?retryWrites=true&w=majority";
const options = {
  dbName: "rightRequest",
  user: "righthistory",
  pass: "vyfq8wjMmoHdzSZU",
};

// const uri = process.env.MONGO_HOST;
// const options = {
//   dbName: process.env.MONGO_DB,
//   user: process.env.MONGO_USER,
//   pass: process.env.MONGO_PASS,
// };

module.exports = mongoose.connect(uri, options);

