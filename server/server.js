const express = require('express');
const app = express();
const path = require('path');

PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});