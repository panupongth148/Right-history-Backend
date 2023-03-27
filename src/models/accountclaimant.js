const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseBcrypt = require('mongoose-bcrypt');
const accountClaimantSchema = new Schema({
  IdCard: {type: String, require: true, unique: true},
  Firstname: String,
  Lastname: String,
  Age: Number,
  Job: String,
  TimesOfRequest: Number,
  Status: String,
  UserIdRef: String
});
accountClaimantSchema.plugin(mongooseBcrypt)
const accountClaimantModel = mongoose.model('AccountClaimant', accountClaimantSchema);


module.exports = accountClaimantModel;