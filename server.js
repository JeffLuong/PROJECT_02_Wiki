var express        = require('express'),
    server         = express(),
    ejs            = require('ejs'),
    bodyParser     = require('body-parse'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    morgan         = require('morgan'),
    expressLayouts = require('express-ejs-layouts'),
    port           = 3000;

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(morgan('short'));
server.use(express.static("./public"));

server.use(expressLayouts);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

var postsController = require('./controllers/posts.js');
server.use('/posts', postsController);

server.get('/', function(req, res) {
  res.render('index');
});

mongoose.connect('mongodb://localhost:27017/wiki_db');

db.on('error', function() {
  console.log("Database error");
});

db.once('open', function() {
  console.log("Database up and running");
  server.listen(port, function() {
    console.log("Server up and running");
  });
});
