const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rightHistorySchema = new Schema({
  ClaimantId: {type: mongoose.Schema.Types.ObjectId, ref: 'AccountClaimant'},
  Document: [{
    title: String,
    files: [{
      file_name: String,
      file_path: String,
      file_type: String
    }],
    state: String,
    time: Date
  }]
});

const rightHistoryModel = mongoose.model('RightHistory', rightHistorySchema);


module.exports = rightHistoryModel;