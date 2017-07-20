var express = require('express');
var router = express.Router();

var authCheck = require('../fileFilter')


// grab storage file
var jsonfile = require('jsonfile')
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})

// multer config
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.title.replace(/ /g, '') + Date.now() + '.jpg')
  }
})
var upload = multer({
  storage: storage,
  fileFilter: authCheck
})

var newProjects = upload.fields([
  {name: "title", maxCount: 1},
  {name: "description", maxCount: 1},
  {name: "pic", maxCount: 12}
])


router.post('/', newProjects, function(req, res, next) {

  // grab all info for storage.json
  var title = req.body.title
  var description = req.body.description
  var photos = []
  if(typeof req.files.pic !== "undefined") {
    req.files.pic.forEach(function(image){
      console.log(image.path);
      photos.push({
        name: image.filename,
        path: image.path.replace('data/public/', '')
      })
    })
  }
  var upload = {
    title: title,
    description: description,
    photos: photos
  }

  // add to data base file
  data.projects.push(upload)
  jsonfile.writeFile(file, data, function (err) {
    console.error(err)
  })


  // if its not you then no
  if(false) {
    res.send({"action": "you are not authenticated"})
  } else {
    res.send({"action": JSON.stringify(upload)})
  }
});

module.exports = router
