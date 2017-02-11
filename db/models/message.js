var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  message: String,
  user: String
});

var MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;