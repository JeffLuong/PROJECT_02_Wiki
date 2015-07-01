var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js'),
    marked  = require('marked');

console.log("article.js successfully exported");

// GET ALL ARTICLES
router.get('/', function(req, res) {
 Article.find({}, function(err, articlesArray) {
   if (err) {
     console.log(err);
   } else {
     res.render('articles/index', {
       article: articlesArray,
       message: "Click to view articles."
     });
   };
 });
});

// GENERATE A RANDOM ARTICLE
router.get('/random', function(req, res) {
  Article.count().exec(function(err, count) {
    var randNum  = Math.floor(Math.random() * count);

    Article.findOne().skip(randNum).exec(function(err, foundArticle) {
      foundArticle.content = marked(foundArticle.content);
      res.render('articles/show', {
        article: foundArticle
      });
    });
  });
});

// GET NEW ARTICLE FORM
router.get('/new', function(req, res) { //CHANGE REFERRER LINK WHEN PUSHING TO HEROKU?
  if (req.session.currentUser && req.headers.referer === "http://localhost:3000/articles/new") {
    res.render('articles/new', {
      username: req.session.currentUser,
      message: "You must complete the entire article."
    });
  } else if(req.session.currentUser) {
    res.render('articles/new', {
      username: req.session.currentUser,
      message: "Write your article."
    });
  } else {
    // MUST LOG IN TO WRITE ARTICLE
    res.render('users/login', {
      message: "You must log in to write your article."
    });
  };

});

// CREATE NEW ARTICLE
router.post('/:title', function(req, res) {
  var newArticle = new Article(req.body.article);
  if (newArticle.content.length === 0 || newArticle.title.length === 0 || newArticle.categories.length === 0) {
    res.redirect(301, '/articles/new');
  } else {
    newArticle.save(function(err, article) {
      console.log("new article posted");
      if (err) {
        console.log(err);
      } else {
        res.redirect(301, '/articles');
      };
    });
  };
});

// SHOW ARTICLE
router.get('/:title', function(req, res) {
  var articleTitle = req.params.title;

  Article.findOne({ title: articleTitle }, function(err, foundArticle) {
    foundArticle.content = marked(foundArticle.content);
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
      article: foundArticle,
      username: req.session.currentUser
    });
  });
});

// UPDATE ARTICLE
router.patch('/:title', function(req, res) {
  var articleTitle = req.params.title,
      articleUpdate = req.body.article;
      articleUpdate.updated_at = Date.now();
  Article.update({ title: articleTitle }, articleUpdate, function(err, result) {
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

// CLICK FOR CATEGORIES
router.get('/categories/:category', function(req, res) {
  Article.find({ categories : req.params.category }, function(err, catResults) {
    if (err) {
      console.log(err);
    } else {
      res.render('articles/cat-index', {
        article: catResults,
        catTitle: req.params.category,
        message: "Here are all articles on " + req.params.category + "."
      })
    };
  });
});

module.exports = router;
