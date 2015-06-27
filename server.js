var express            = require('express'),
    server             = express(),
    ejs                = require('ejs'),
    bodyParser         = require('body-parser'),
    methodOverride     = require('method-override'),
    mongoose           = require('mongoose'),
    morgan             = require('morgan'),
    session            = require('express-session'),
    expressLayouts     = require('express-ejs-layouts'),
    articlesController = require('./controllers/article.js'),
    usersController    = require('./controllers/users.js'),
    url                = 'mongodb://localhost:27017/wiki_db',
    port               = 3000;

// MORGAN ERROR DETECTION
server.use(morgan('short'));

// VIEWS + LAYOUTS
server.set('views', './views');
server.set('view engine', 'ejs');
server.use(expressLayouts);

// SESSIONS
server.use(session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: false
}));

// STATIC FILES
server.use(express.static("./public"));

// FORMS
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

// CONTROLLERS
server.use('/articles', articlesController);
server.use('/users', usersController);

server.get('/', function(req, res) {
  res.render('index');
});

server.get('/welcome', function(req, res) {
  res.render('welcome');
});

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', function() {
  console.log("Database error");
});

db.once('open', function() {
  console.log("Database up and running");
  server.listen(port, function() {
    console.log("Server up and running");
  });
});
