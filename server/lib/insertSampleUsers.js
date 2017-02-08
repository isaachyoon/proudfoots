var User = require('./../../db/models/user');
var mongoose = require('mongoose');
var data = require('./sampleUserData.json');
var dbURL = require('./api_config.js');
mongoose.connect(dbURL.dbURL);


User.create(data, function(err, result) {
  if (err) {
    console.log('Something went wrong', err);
    process.exit();
  } else {
    console.log('Documents inserted', result);
    process.exit();
  }
});

