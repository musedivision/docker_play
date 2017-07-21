var jsonfile = require('jsonfile')

// config
var file = '../data/storage.json'

var db = {
  read: function(cb){
    jsonfile.readFile('../../data/storage.json', cb,  function(cb){
      cb()
    })
  },

  update: function(data){
    jsonfile.writeFile('./data/storage.json', data, function (err) {
      return err ? console.log(err) : {}
    })
  }
}


module.exports = db
