const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.db = mongoose.connect(process.env.DB_URI, {
  useMongoClient: true,
  /* other options */
}, function(error) {
  if (error) console.error("Unable to connect to the mongoDB server. Error: " + error);
});