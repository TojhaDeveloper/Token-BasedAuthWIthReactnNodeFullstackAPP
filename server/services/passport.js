const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const localOptions = { usernameField : 'email'};

//Create Local Strategy
const localLogin = new LocalStrategy(localOptions , function(email, password, done){
  //verify this email and password

  User.findOne({email : email}, function(err, user){
      if(err) return done(err);
      if(!user) { return done(null, false); }

      //Compare the passwords now 
      user.comparePassword(password, function(err, isMatch){
         if(err) { return done(err);}
         if(!isMatch){ return done(null, false);}
         return done(null, user);
      });
  })

});

//Create Jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //See if the user Id in the payload exsists in our database
    //if it does then call done with that 
    //otherwise call done without a user object
    User.findById(payload.sub, function (err, user) {
        if (err) return done(err, false);

        if (user) {
            done(null, user)
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);