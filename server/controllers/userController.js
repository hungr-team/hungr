const db = require('../models/hungrModel');

const userController = {};

userController.addUser = (req, res, next) => {
  // assuming req.body looks like: {username: 'test', password: 'test'}
  const queryStr = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`;
  db.query(queryStr)
    .then((response) => {
      console.log('User added to database');
      return next();
    })
    .catch((err) => {
      console.log('Error in adding user to db: ', err);
    });
};

// update radius
userController.updateRadius = async (req, res, next) => {
  // assuming req.body looks like: {username: 'jackie', newRadius: 2}
  const username = req.body.username;
  const newRadius = req.body.newRadius;
  const updateQueryStr = `UPDATE users SET radius=${newRadius} WHERE username='${username}'`;
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
  // assuming req.body looks like: {userId: 1, preferences: ['American', 'Chinese']}
  const userId = req.body.userId;
  const preferences = req.body.preferences;
  const foodTypeIdArr = [];
  try {
    for (let i = 0; i < preferences.length; i += 1) {
      const foodTypeQuery = `SELECT _id FROM food_types WHERE food_type='${preferences[i]}'`;
      const response = await db.query(foodTypeQuery);
      foodTypeIdArr.push(response.rows[0]._id);
    }
    for (let i = 0; i < foodTypeIdArr.length; i += 1) {
      const insertQuery = `INSERT INTO user_food_prefs (user_id, food_type_id) VALUES (${userId}, ${foodTypeIdArr[i]})`;
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
  // assuming they request based off a user's userId
  // otherwise swap to `...WHERE u.username='${req.body.username}'`
  // const userId = req.body.userId;
  const userId = 1;
  const queryStr = `SELECT ft.food_type FROM food_types ft INNER JOIN user_food_prefs ufp on ft._id = ufp.food_type_id INNER JOIN users u ON u._id = ufp.user_id WHERE u._id = ${userId}`;
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
  // delete all rows where username=req.body...
  const deleteStr = `DELETE FROM user_food_prefs WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${username}')`;
  try {
    const deleted = await db.query(deleteStr);
    // either copy add pref loops here or just add addPrefs to middleware chain and add there
    return next();
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};

// add restaurant

// add restaurant to liked

// add restaurant to blocked

// remove restaurant from liked

// remove restaurant from blocked

// function to delete all tables
const dropTables = async () => {
  await db.query('DROP TABLE user_food_prefs');
  await db.query('DROP TABLE liked_restaurants');
  await db.query('DROP TABLE blocked_restaurants');
  await db.query('DROP TABLE restaurants');
  await db.query('DROP TABLE food_types');
  await db.query('DROP TABLE users');
};
// dropTables();
