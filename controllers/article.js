var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js');

console.log("article.js successfully exported");

// GET ALL ARTICLES
router.get('/articles', function(req, res) {
  // Article.find({}, function(err, articlesArray) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  console.log("Can't load articles");
      res.render('articles/index', {});
  //   };
  // });
});

// GET NEW ARTICLE FORM
router.get('/articles/new', function(req, res) {
  res.render('articles/new', {});
});

// CREATE NEW ARTICLE
router.post('/articles/new', function(req, res) {
  var newArticle = new Article(req.body.article);
  newArticle.save(function(err, article) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles');
    };
  });
});

// SHOW ARTICLE
router.get('/articles/:id', function(req, res) {
  var mongoId = req.params.id;

  article.findOne({ _id: mongoId }, function(err, foundArticle) {
    res.render('articles/show', {
      article: foundArticle
    });
  });
});

// EDIT ARTICLE
router.get('/articles/:id/edit', function(req, res) {
  var mongoId = req.params.id;

  article.findOne({ _id: mongoId }, function(err, foundArticle) {
    res.render('articles/edit', {
      article: foundArticle
    });
  });
});

// UPDATE ARTICLE
router.patch('articles/:id', function(req, res) {
  var mongoId = req.params.id;
  var articleUpdate = req.body.article;

  article.update({ _id: mongoId }, articleUpdate, function(err, result) {
    res.redirect(301, '/articles/' + req.params.id);
  });
});

// DELETE ARTICLE
router.delete('articles/:id', function(req, res) {
  var mongoId = req.params.id;

  article.remove(
    { _id: mongoId }, function(err, result) {
      res.redirect(301, '/articles');
  });
});

module.exports = router;
