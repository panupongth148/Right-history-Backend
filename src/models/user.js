const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseBcrypt = require('mongoose-bcrypt');
const userSchema = new Schema({
  Email: {type: String, require: true, unique: true, lowercase: true},
  Password: {type: String, bcrypt: true},
  Firstname: String,
  Lastname: String,
  EmployeeId: String,
  type: String,
  token: String
});
userSchema.plugin(mongooseBcrypt)
const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;