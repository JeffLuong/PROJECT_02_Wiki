var express = require('express'),
     router = express.Router(),
       User = require('../models/user.js');

console.log('users.js successfully exported');

router.get('/users/new', function(req, res) {
  // res.render('users/new', {});
  res.render("WHAT THE FUCK");
  console.log("can't get to new users form");
});

router.post('/users/new', function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    res.redirect(301, 'welcome');
  });
});

// LOGIN PAGE
// router.get('/login', function(req, res) {
//   res.render('users/login');
// });

// LOGIN ATTEMPT
// router.post('/', function(req, res) {
//   var loginAttempt = req.body.user;
//
//   User.findOne({ username: loginAttempt.username }, function(err, user) {
//     if(user && user.password === loginAttempt.password) {
//       req.session.currentUser = user.username;
//       res.redirect(301, 'welcome');
//     }
//   });
// });

module.exports = router;
