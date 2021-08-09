const db = require('../models/hungrModel');

const userController = {};

userController.addUser = () => {
  // assuming req.body looks like: {username: 'test', password: 'test'}
};

// db.query(
//   `INSERT INTO users (username, password, radius) VALUES ('${username}', '${password}', ${radius})`
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// inserts dummy data into user_food_prefs
// db.query(
//   `INSERT INTO user_food_prefs (user_id, food_type_id) VALUES (${1}, ${4})`
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// db.query(
//   `INSERT INTO user_food_prefs (user_id, food_type_id) VALUES (${1}, ${8})`
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// db.query(
//   `INSERT INTO user_food_prefs (user_id, food_type_id) VALUES (${2}, ${6})`
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// db.query(
//   `INSERT INTO user_food_prefs (user_id, food_type_id) VALUES (${2}, ${3})`
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// join user and user's preferred food types
// SELECT ft.food_type FROM food_types ft INNER JOIN user_food_prefs ufp on ft._id = ufp.food_type_id INNER JOIN users u ON u._id = ufp.user_id WHERE u._id = 2

const dropTables = async () => {
  await db.query('DROP TABLE user_food_prefs');
  await db.query('DROP TABLE liked_restaurants');
  await db.query('DROP TABLE blocked_restaurants');
  await db.query('DROP TABLE restaurants');
  await db.query('DROP TABLE food_types');
  await db.query('DROP TABLE users');
};

// dropTables();
