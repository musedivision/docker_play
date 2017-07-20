var express = require('express');
var router = express.Router();

// read storage json
var jsonfile = require('jsonfile')
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Richard Keddell studio',
    data: data
  });
});

module.exports = router;
