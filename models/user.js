var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var userSchema = Schema ({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true, unique: true }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
