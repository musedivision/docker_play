var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
//var passport = require('passport')
//require('./passport')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware')
var autoPrefixer = require('express-autoprefixer');
var postcssMiddleware = require('postcss-middleware')


var login = require('./login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: "quid pro contra", resave: false, saveUninitialized: false}));
//app.use(passport.initialize())
//app.use(passport.session())
app.use(cookieParser());
app.use(sass({
  src: path.join(__dirname, './data/public'),
  dest: path.join(__dirname, './data/public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(autoPrefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }));
app.use(express.static(path.join(__dirname, './data/public')));

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/about', require('./routes/about'));
app.use('/project', require('./routes/project'));
app.use('/login', require('./routes/login'));
app.use('/signout', require('./routes/signout'));
app.use('/edit', require('./routes/edit'));
// API
app.use('/edit/api', require('./routes/upload'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  if(req.app.get('env') === 'production') {
    res.redirect('/')
  } else {
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
