var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var userSchema = Schema ({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
