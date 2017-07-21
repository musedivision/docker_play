var express = require('express');
var router = express.Router();

var fs = require('fs')
var db = require('jsonfile')

//db connect
var file = '../data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})


// home photos
router.post('/home', upload.array('home', 12), function(req, res, next) {
  if(false) {
    res.send({"action": "you are not authenticated"})
  } else {
    // AUTHENITICATED
    // grab info for storage JSON
    var photos = []
    var deadPhotos = data.home.photos
    req.files.forEach(function(image){
      photos.push({
        name: image.filename,
        path: image.path.replace('./data/public/', '')
      })
    })

    // add to data base file
    data.home.photos = photos
    jsonfile.writeFile(file, data, function (err) {
      err ? console.log(err) : {}
    }))

    // search through uploads folder
    // delete any files that are now unused by because of new upload
    if(deadPhotos.length > 0) {
      deadPhotos.forEach(function(photo) {
        console.log("XXXXXXXXX")
        console.log("DEAD MAN")
        console.log("XXXXXXXXX")
        fs.unlink("data/public/"+photo.path, function(err){
          err ? console.error(err) : {}
        });
      });
    }

    res.send({"action": req.files})
  }
});


module.exports = router
