const express = require('express');

const app = express();
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const userController = require('./controllers/userController');
require('./oauth');
const passportHttp = require('passport-http');
const logout = require('express-passport-logout');

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

// function validating if users are logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// oauth related routes with corresponding middleware
app.get('/failed', (req, res) => res.send('Login failed'));

app.get(
  '/loggedIn',
  isLoggedIn,

  (req, res) => {
    //console.log(req.user);
    return res.send(`Welcome ${req.user.displayName}`);
  }
);

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/signIn' }),
  function (req, res) {
    console.log(req.user.provider);
    res.redirect('/');
  }
);

// direct here to destroy cookies
app.get('/logOut', (req, res) => {
  // req.session = null;
  delete req.user;
  req.logout();

  res.redirect('/signIn');
});

//userController.findUser,
//userController.addUser,

app.get('/signIn', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/signIn', userController.findUser, (req, res) => {
  console.log('80 ', res.locals.userFound);
  res.status(200).json(res.locals.userFound);
});

app.get('/signUp', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get(['/', '/settings', '/lists'], (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../index.html'))
);

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Middleware error');
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
