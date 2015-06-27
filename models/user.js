var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var userSchema = Schema ({
  name: { type: String },
  password: { type: String }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
