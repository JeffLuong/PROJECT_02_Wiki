var express = require('express'),
     router = express.Router(),
       User = require('../models/user.js');

console.log('users.js successfully exported');

// GET NEW USER FORM
router.get('/new', function(req, res) {
  res.render('users/new', {});
});

// SHOW USER PROFILE
router.get('/', function(req, res) {
  if(req.session.currentUser) {
    res.render('users/profile', {
        user: req.session.currentUser
    });
  } else {
    res.render('users/login');
  };
});

// CREATE NEW USER
router.post('/', function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    res.redirect(301, 'welcome');
  });
});
//
// LOGIN PAGE
router.get('/login', function(req, res) {
  res.render('users/login');
  console.log("login page received.");
});

// LOGIN ATTEMPT
router.post('/', function(req, res) {
  var loginAttempt = req.body.user;
  console.log(req.body.user);
  // $(".message h1").text("logged in successfully");
  //
  User.findOne({ username: loginAttempt.username }, function(err, user) {
    if (user && user.password === loginAttempt.password) {
      console.log("failed to redirect to welcome page");
      req.session.currentUser = user.username;
      res.redirect(301, 'welcome');
    } else if (!user) {
      console.log("failed to redirect to create user");
      $('.message h1').text("User does not exist. Please sign up to contribute.")
      res.redirect(301, 'welcome');
    } else if (user && user.password !== loginAttempt.password) {
      console.log("failed to redirect to login.");
      $('.message h1').text("Password or Username failed.")
      res.redirect(301, 'welcome');
    };
  });
});

module.exports = router;
