var express = require('express');
var router = express.Router();

// read storage json
var jsonfile = require('jsonfile')
var file = './data/storage.json'
jsonfile.readFile(file, function(err, obj){
  return data = obj.projects
})




router.get('/:data', fetch)

function fetch(req, res, next){
  console.log(JSON.stringify(req.url))
  var title = req.url.replace('/','')
  var project = {}
  data.projects.forEach(function(obj){
    if(obj.title === title.replace(/%20/g, ' ')){
      return project = obj
    }
  })
  console.log(project.photos)
  res.render('project', {"data": project, title: title.replace(/%20/g, ' ')})
}

module.exports = router
