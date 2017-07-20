var express = require('express');
var router = express.Router();

// read storage json
var jsonfile = require('jsonfile')
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})

/* GET users listing. */
router.get('/*', function(req, res, next) {
  // if its not you then no
  if(!req.session.isAuthenticated) {
    res.redirect('/login')
  } else {
    res.render('edit', {
      title: 'CMS',
      data: data,
      session: JSON.stringify(req.session)
    })
  }

});

module.exports = router;
