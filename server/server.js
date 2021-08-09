const express = require('express');
const app = express();
const path = require('path');
const userController = require('./controllers/userController');

PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get(['/', '/login', '/signup', '/settings', '/lists'], (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

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
