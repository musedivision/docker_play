var express = require('express');
var router = express.Router();
var projectList = require('./projects.json')



/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')

});

module.exports = router;
