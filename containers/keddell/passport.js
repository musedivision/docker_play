var passport = require('passport')
var LocalStrategy = require('passport-local')



passport.use(new LocalStrategy(authenticate))

function authenticate(user, password, done) {
  var validUser = process.env.USER
  var validPassword = process.env.TESTPHRASE
  console.log(`Correct pair: ${validUser}: ${validPassword}`)
  console.log(`Attempt pair: ${user}: ${password}`)

  var answer = {
    message: 'some TESTPHRASE'
  }

  return answer
  // return done(null, false, {message: 'TRY AGAIN'})
}

passport.serializeUser(function(answer, done){
  done(null, answer.message)
})

passport.deserializeUser(function(answer, done){
  done(null, answer)
})
