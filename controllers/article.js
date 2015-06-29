var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js');

console.log("article.js successfully exported");

// GET ALL ARTICLES
router.get('/', function(req, res) {
 Article.find({}, function(err, articlesArray) {
   if (err) {
     console.log(err);
   } else {
     res.render('articles/index', {
       article: articlesArray
     });
   };
 });
});

// GET NEW ARTICLE FORM
router.get('/new', function(req, res) {
  res.render('articles/new', {});
});

// CREATE NEW ARTICLE
router.post('/:title', function(req, res) {
  var newArticle = new Article(req.body.article);
  newArticle.save(function(err, article) {
    console.log("new article posted");
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles');
    };
  });
});

// SHOW ARTICLE
router.get('/:title', function(req, res) {
  var articleTitle = req.params.title;
  console.log(articleTitle);
  Article.findOne({ title: articleTitle }, function(err, foundArticle) {
    console.log(foundArticle);
    res.render('articles/show', {
      article: foundArticle
    });
  });
});

// EDIT ARTICLE
router.get('/:title/edit', function(req, res) {
  var articleTitle = req.params.title;

  Article.findOne({ title: articleTitle }, function(err, foundArticle) {
    res.render('articles/edit', {
      article: foundArticle
    });
  });
});

// UPDATE ARTICLE
router.patch('/:title', function(req, res) {
  var articleTitle = req.params.title;
  var articleUpdate = req.body.article;

  Article.update({ title: articleTitle }, articleUpdate, function(err, result) {
    console.log("Logging....");
    res.redirect(301, '/articles/' + articleUpdate.title);
  });
});

// DELETE ARTICLE
router.delete('/:title', function(req, res) {
  var articleTitle = req.params.title;

  Article.remove(
    { title: articleTitle }, function(err, result) {
      res.redirect(301, '/articles');
  });
});

module.exports = router;
