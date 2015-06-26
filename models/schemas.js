var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var articleSchema = Schema({
  title: { type: String },
  author: { type: String },
  content: { type: String }
});



module.exports = article;
