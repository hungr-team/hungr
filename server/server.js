const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('./oauth');

PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use(
  cookieSession({
    name: 'hungr',
    keys: ['keys1', 'keys2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//function validating if users are logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

//oauth related routes with corresponding middleware
app.get('/failed', (req, res) => res.send('Login failed'));

app.get('/loggedIn', isLoggedIn, (req, res) => {
  console.log(req.locals);
  return res.send(`Welcome ${req.user.displayName}`);
});

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/loggedIn');
  }
);

//direct here to destroy cookies
app.get('/logOut', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
