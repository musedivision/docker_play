var express = require('express');
var router = express.Router();

// read storage json
var jsonfile = require('jsonfile')
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('about', {
    title: "About & Projects",
    data: data
  });
});

module.exports = router;
