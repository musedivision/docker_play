var express = require('express');
var router = express.Router();
var projectList = require('./projects.json')

var session = require('express-session')



/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.isAuthenticated = req.session.isAuthenticated ? true : false
  var seshDev = JSON.stringify(req.session)

  if(req.session.isAuthenticated){
    res.render('edit', {
      title: 'CMS',
      projectList: projectList,
      session: seshDev
    } )
  } else {
    res.render('login', {
      title: 'Login',
      projectList: projectList,
      session: seshDev
    });
  }
});

router.post('/', function(req, res, next) {
  req.session.isAuthenticated = false
  var correct = {
    name: process.env.USER,
    phrase: process.env.TESTPHRASE
  }
  var attempt = {
    name: req.param('email'),
    phrase: req.param('password')
  }
  console.log(req.params)

  // is it you
  if(correct.name === attempt.name && correct.phrase === attempt.phrase) {
    req.session.isAuthenticated = true
    req.session.user = attempt.name
    res.redirect('/edit');
  } else {
    res.redirect('/login')
  }
})

module.exports = router;
