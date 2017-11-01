const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({ 
  name: String,
  username: String,
  questions: [{ question: String, rating: Number }]
});

module.exports = mongoose.model('Vote', VoteSchema);