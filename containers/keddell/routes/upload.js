var express = require('express');
var router = express.Router();

var fs = require('fs')
var multer = require('multer')
var jsonfile = require('jsonfile')
var authCheck = require('./fileFilter')

var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})

// MULTER CONFIG PHOTO MANAGMENT
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, (req.body.title ? req.body.title : "home") + Date.now() + '.jpg')
  }
})
function fileFilter (req, file, cb) {
  if(true) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

// HOME PHOTOS
router.post('/home', upload.array('home', 12), function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {
    // AUTHENITICATED
    // grab info for storage JSON
    var photos = []
    var deadPhotos = data.home.photos
    req.files.forEach(function(image){
      photos.push({
        name: image.filename,
        path: image.path.replace('data/public/', '')
      })
    })

    // add to data base file
    data.home.photos = photos
    jsonfile.writeFile(file, data, function (err) {
      err ? console.log(err) : {}
    })

    // search through uploads folder
    // delete any files that are now unused by because of new upload
    if(deadPhotos.length > 0) {
      deadPhotos.forEach(function(photo) {
        fs.unlink("data/public/"+photo.path, function(err){
          err ? console.error(err) : {}
        });
      });
    }
    res.redirect('/edit')
  }
});

// REORDER THE PHOTOS ARRAY
router.post('/order', function(req, res ,next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {
    // agnostic order array, to order one of the many home or project arrays
    // which project?
    var old
    if(req.body.name === 'home') {
      old = data.home.photos
    } else {
      data.projects.forEach(function(project){
        if(project.title === req.body.name) {
          old = project.photos
        }
      })
    }

    // construct new array
    var shiny = []
    req.body['order[]'].forEach(function(name){
      old.forEach(function(obj){
        if(obj.name === name){
          shiny.push(obj)
        }
      })
    })

    // update db
    if(req.body.name === 'home') {
      data.home.photos = shiny
    } else {
      data.projects.forEach(function(project, i){
        if(project.title === req.body.name) {
          data.projects[i].photos = shiny
        }
      })
    }
    jsonfile.writeFile(file, data, function (err) {
      err ? console.log(err) : {}
    })
    res.send({"thanks for all the fist": "SORTED"})
  }
})



// order DELETE
router.post('/order/delete', function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {
    // find photos array
    var living, deadMan, current
    if(req.body.name === 'home') {
      living = data.home.photos
      current = living
    } else {
      data.projects.forEach(function(project){
        if(project.title === req.body.name) {
          living = project.photos
          current = living
        }
      })
    }
    current.forEach(function(obj, i){
      if(obj.name === req.body.photo) {
        deadMan = "data/public/"+obj.path
        console.log("a match! /order/delete")
        living.splice(i, 1)
      }
    })
    console.log(deadMan);
    // delete file
    fs.unlink(deadMan, function(err){
      err ? console.error(err) : {}
    });

    // update db
    if(req.body.name === 'home') {
      data.home.photos = living
    } else {
      data.projects.forEach(function(project, i){
        if(project.title === req.body.name) {
          data.projects[i].photos = living
        }
      })
    }
    jsonfile.writeFile(file, data, function (err) {
      err ? console.log(err) : {}
    })

    res.send({"thanks for all the deletes": req.body.name})
  }
})


var projectFields = upload.fields([
  {name: "title", maxCount: 1},
  {name: "description", maxCount: 1},
  {name: "pic", maxCount: 12}
])

// NEW PROJECT
router.post('/project/new', projectFields, function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {
    // grab all info for storage.json
    var title = req.body.title
    var description = req.body.description
    var photos = []
    if(typeof req.files.pic !== "undefined") {
      req.files.pic.forEach(function(image){
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
    data.projects.push(upload)
    jsonfile.writeFile(file, data, function (err) {
      console.error(err)
    })

    res.redirect('/edit')
  }
});

// EDIT PROJECT
router.post('/project/edit', projectFields, function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {
    // text info
    var title = req.body.title
    var description = req.body.description
    var upload = {
      title: title,
      description: description,
    }

    // if photos arr is not there or empty then dont check it all
    if(Array.isArray(req.files.pic)){
      // CREATE NEW PHOTOS ARRAY
      var photos = []
      if(typeof req.files.pic !== "undefined") {
        req.files.pic.forEach(function(image){
          photos.push({
            name: image.filename,
            path: image.path.replace('data/public/', '')
          })
        })
      }
      upload.photos = photos
    } else {
      // GET OLD PHOTOS IF UNCHANGED
      data.projects.forEach(function(project, i){
        if(req.body.project === project.title) {
          upload.photos = project.photos
        }
      })
    }

    // UPDATE THE PROJECT
    data.projects.forEach(function(project, i){
      if(req.body.project === project.title) {
        data.projects[i] = upload
      }
    })

    // UPDATE DB
    jsonfile.writeFile(file, data, function (err) {
      console.error(err)
    })

    res.redirect('/edit')
  }
});



// DELETE A PROJECT
router.post('/project/delete', function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"the": "NOT authenticated"})
  } else {
    var deadProject = {}
    var list_of_files = []

    // delete project from storage JSON
    data.projects.forEach(function(item, i) {
      if(req.body.delete === item.title) {
        deadProject = data.projects[i]
        data.projects.splice(i, 1)
      }
    })
    console.log(data.projects);
    jsonfile.writeFile(file, data, function (err) {
      err ? console.log(err) : {}
    })
    // delete all photos of the same project name.
    deadProject.photos.forEach(function(photo) {
      fs.unlink("data/public/"+photo.path, function(err){
        err ? console.error(err) : {}
      });
    });
    res.redirect('/edit')
  }
})


// ADD ABOUT DESCRIPTION
router.post('/about', function(req, res, next) {
  if(!req.session.isAuthenticated) {
    res.send({"action": "you are not authenticated"})
  } else {

      // parse the string for the italic elements
      // create array of objects which have in them
      var text = []
      var arr = req.body.about.split("\r\n\r\n")
      arr.forEach(function(para){
        if(para.search(/ITALIC /g) === 0){
          text.push({
            "class": "italic",
            "text": para.replace('ITALIC ', '')
          })
        } else if(para.length > 0) {
          text.push({
            "class": "normal",
            "text": para
          })
        }
      })
      // add to data base file
      data.about = text
      jsonfile.writeFile(file, data, function (err) {
        console.error(err)
      })
    res.redirect('/edit')
  }
})

module.exports = router;
