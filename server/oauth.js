const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '157973732471-mlqs5sviqnkd4sv1t5rduf30mvmpuk4h.apps.googleusercontent.com',
      clientSecret: 'd3TW9l082DrgJU1DjI46q4hi',
      callbackURL: 'http://localhost:8080/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(profile);
      return done(null, profile);
    }
  )
);

module.exports = passport;
