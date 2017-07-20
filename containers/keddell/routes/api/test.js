var express = require('express');
var router = express.Router();

router.get('/test', function(req, res ,next) {
  res.send("thanks for all the fish" + req.url)
})

module.exports = router
