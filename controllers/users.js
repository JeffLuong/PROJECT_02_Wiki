var express       = require('express'),
    router        = express.Router(),
    User          = require('../models/user.js'),
    loginCounter  = 0,
    createCounter = 0;

console.log('users.js successfully exported');

// GET NEW USER FORM
router.get('/new', function(req, res) {
  if (req.headers.referer === "http://localhost:3000/users/login" && createCounter !==0) {
    createCounter++;
    res.render('users/new', {
      message: "No such username. Please sign up."
    });
  } else {
    res.render('users/new', {
      message: "Create an account to write an article."
    });
  };
});

// SHOW USER PROFILE WITH SESSIONS
router.get('/', function(req, res) {
  if(req.session.currentUser) {
    console.log(req.session.currentUser);
    User.findOne({ username: req.session.currentUser}, function(err, foundUser) {
      console.log(foundUser);
      res.render('users/profile', {
          user: foundUser,
          message: "Your profile info."
      });
    });
  } else {
    res.render('users/login', {
      message: "Log In to view your profile."
    });
  };
});


// LOGIN PAGE
router.get('/login', function(req, res) {
  if (req.headers.referer === "http://localhost:3000/users/login" && loginCounter !== 0) {
    loginCounter = 0;
    res.render('users/login', {
      message: "Username or password failed. Try again."
    });
  } else {
    res.render('users/login', {
      message: "Log in to write an article."
    });
  };
});

// LOGIN ATTEMPT
router.post('/login', function(req, res) {
  var loginAttempt = req.body.user;
  console.log(req.headers.referer);
  User.findOne({ username: loginAttempt.username }, function(err, user) {
    if (user && user.password === loginAttempt.password) {
      req.session.currentUser = user.username;
      res.redirect(301, '/');
    } else if (!user) {
      createCounter++;
      res.redirect(301, '/users/new');
    } else if (user && user.password !== loginAttempt.password || user && user.username !== loginAttempt.username) {
      loginCounter++;
      res.redirect(301, '/users/login');
    };
  });
});


// CREATE NEW USER
router.post('/', function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    res.redirect(301, '/users/' + user._id);
  });
});

// LOGOUT USER
router.get('/logout', function(req, res) {
  req.session.currentUser = null;
  res.redirect(301, '/');
  console.log("logged out");
});

// SHOW USER PROFILE
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/profile', {
      user: foundUser,
      message: "Your profile info."
    });
  });
});

// GET PROFILE EDIT PAGE
router.get('/:id/edit', function(req, res) {
  var mongoId = req.params.id;

  User.findOne({ _id: mongoId }, function(err, foundUser) {
    res.render('users/edit', {
      user: foundUser,
      message: "Edit your profile."
    });
  })
});

// UPDATE USER PROFILE
router.patch('/:id', function(req, res) {
  var mongoId = req.params.id,
   userUpdate = req.body.user;

   User.update({ _id: mongoId }, userUpdate, function(err, result) {
     res.redirect(301, '/users/' + mongoId);
   });
});



module.exports = router;
