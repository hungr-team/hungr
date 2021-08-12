const db = require('../models/hungrModel');

const userController = {};

userController.findUser = async (req, res, next) => {
  const findUser = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
  // const findUser = `SELECT * FROM users`;
  res.locals.userFound = false;
  db.query(findUser)
    .then((result) => {
      userFound = true;
      console.log('20 ', result.rows);
      if (result.rows.length > 0) {
        res.locals.userFound = true;
        res.cookie('username', req.body.username);
      }
      return next();
    })
    .catch((err) => {
      console.log('24 err 14 user controller ', err);
      res.locals.userFound = false;
      return next();
    });
};

userController.addUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);

  if (res.locals.userFound) {
    req.body = { error: 'user already exists' };
    return next();
  }

  //return next();
  // const username = 'jackie';
  // const password = 'douglass';

  const queryStr = `INSERT INTO users (username, password) SELECT DISTINCT '${username}', '${password}' WHERE '${username}' NOT IN (SELECT username FROM users)`;
  try {
    await db.query(queryStr);
    res.cookie('username', req.body.username);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
// userController.addUser();

// get radius
userController.getRadius = async (req, res, next) => {
  const username = req.body.username;
  const getRadiusQueryStr = `SELECT radius FROM users WHERE username='${username}'`;
  try {
    const retrievedRadius = await db.query(getRadiusQueryStr);
    res.locals.userRadius = retrievedRadius.rows[0].radius;
    return next();
  } catch (err) {
    if (err) console.log(err);
    return next(err);
  }
};

// update radius
userController.updateRadius = async (req, res, next) => {
  const username = req.body.username;
  const radius = req.body.radius;
  console.log("raaadus",{username,radius});
  const updateQueryStr = `UPDATE users SET radius=${radius} WHERE username='${username}'`;
  try {
    const updatedRow = await db.query(updateQueryStr);
    return next();
  } catch (err) {
    if (err) console.log(err);
    return next(err);
  }
};

// add preferences to user
userController.addPreferences = async (req, res, next) => {
  const username = req.body.username;
  const preferences = req.body.preferences;
  const foodTypeIdArr = [];
  try {
    const userIdQuery = await db.query(
      `SELECT _id FROM users WHERE username='${username}'`
    );
    const userId = userIdQuery.rows[0]._id;

    for (let i = 0; i < preferences.length; i += 1) {
      const foodTypeQuery = `SELECT _id FROM food_types WHERE food_type='${preferences[i]}'`;
      const response = await db.query(foodTypeQuery);
      foodTypeIdArr.push(response.rows[0]._id);
    }

    for (let j = 0; j < foodTypeIdArr.length; j += 1) {
      const insertQuery = `INSERT INTO user_food_prefs (user_id, food_type_id) SELECT DISTINCT ${userId}, ${foodTypeIdArr[j]}`;
      const insert = await db.query(insertQuery);
    }
    // if frontend can send us the food type's code we can delete first loop
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// get user's preferences from db
userController.getPreferences = async (req, res, next) => {
  const username = req.body.username;

  const queryStr = `SELECT ft.food_type FROM food_types ft INNER JOIN user_food_prefs ufp on ft._id = ufp.food_type_id INNER JOIN users u ON u._id = ufp.user_id WHERE u.username = '${username}'`;

  const userPrefs = [];

  try {
    const prefResults = await db.query(queryStr);
    console.log(prefResults);
    for (let i = 0; i < prefResults.rows.length; i += 1) {
      userPrefs.push(prefResults.rows[i].food_type);
    }
    res.locals.userPrefs = userPrefs;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// update user preferences
userController.updatePreferences = async (req, res, next) => {
  const username = req.body.username;
  // clear out previous preferences
  const deleteStr = `DELETE FROM user_food_prefs WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${username}')`;
  try {
    const deleted = await db.query(deleteStr);
    return next();
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};

// function to delete all tables -> find the command line command to run and rebuild tables in hungrModel.js
const dropTables = async () => {
  await db.query('DROP TABLE user_food_prefs');
  await db.query('DROP TABLE liked_restaurants');
  await db.query('DROP TABLE blocked_restaurants');
  await db.query('DROP TABLE restaurants');
  await db.query('DROP TABLE food_types');
  await db.query('DROP TABLE users');
};
// dropTables();

module.exports = userController;
