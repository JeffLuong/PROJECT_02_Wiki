var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/// Is there a way to have a maximum number of categories?
var articleSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  categories: [{ type: String, required: true }],
  created_at: { type: Date, default: Date.now }
});


var article = mongoose.model("Article", articleSchema);

module.exports = article;
