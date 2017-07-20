function fileFilter (req, file, cb) {
  if(true) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = fileFilter
