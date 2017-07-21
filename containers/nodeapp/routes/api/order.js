var express = require('express');
var router = express.Router();

var fs = require('fs')
var authCheck = require('../fileFilter')
var jsonfile = require('jsonfile')

// grab storage file
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj
})


router.post('/order', function(req, res ,next) {
  // agnostic order array, to order one of the many home or project arrays
  // which project?


  // grab old list and reorder database list with new order
  var old = data.home.photos
  var shiny = []
  // // construct new array
  req.body['order[]'].forEach(function(name){
    old.forEach(function(obj){
      console.log(obj)
      if(obj.name === name){
        shiny.push(obj)
      }
    })
  })

  // update db
  data.home.photos = shiny
  jsonfile.writeFile(file, data, function (err) {
    err ? console.log(err) : {}
  })
  res.send({"thanks for all the fist": "SORTED"})
})



//delete photo from home array and file
router.post('/home/delete', function(req, res, next) {

  // this deletes a single file
  // check Authorised before delete

  var deadMan
  var living = data.home.photos
  data.home.photos.forEach(function(obj, i){
    if(obj.name === req.body.filename) {
      console.log("a match! /home/delete")
      living.splice(i, 1)
      deadMan = "data/public/"+obj.path
    }
  })
  // delete file
  fs.unlink(deadMan, function(err){

    err ? console.log("ERROR INSIDE FS.UNLINK");console.error(err) : {}
  });

  // update db
  data.home.photos = living
  jsonfile.writeFile(file, data, function (err) {
    err ? console.log(err) : {}
  })

  res.send({"thanks for all the deletes": req.body.filename})
})

module.exports = router
