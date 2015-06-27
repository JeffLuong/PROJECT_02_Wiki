var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var articleSchema = Schema({
  title: { type: String },
  author: { type: String },
  content: { type: String }
});


var article = mongoose.model("Article", articleSchema);

module.exports = article;
