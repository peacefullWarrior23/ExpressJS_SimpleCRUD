const passport = require('passport')

require('dotenv').config();

const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;



passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser((user,done) => {
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});