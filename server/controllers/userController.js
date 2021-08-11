const db = require('../models/hungrModel');

const userController = {};

userController.findUser = (req, res, next) => {
  // if (req.user.provider === 'google' ) {
  //   // const queryStr = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`;
  //   req.body.username = req.user.displayName.replace(/[\s]/, '');
  //   req.body.password = req.user.id;
  // }

  const findUser = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
  //const findUser = `SELECT * FROM users WHERE username = 'jackie'`;
  res.locals.userFound = false;
  db.query(findUser)
    .then((result) => {
      userFound = true;
      console.log('20 ', result.rows);
      if (result.rows.length > 0) {
        res.locals.userFound = true;
      }
      return next();
    })
    .catch((err) => {
      console.log('24 err 14 user controller ', err);
      res.locals.userFound = false;
      return next();
    });
};

userController.addUser = (req, res, next) => {
  //find user to check if theyre in database already

  // assuming req.body looks like: {username: 'test', password: 'test'}
  if (res.locals.userFound === true) {
    return next();
  }

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
userController.updateRadius = (req, res, next) => {};

// add preferences to user
userController.addPreferences = async (req, res, next) => {
  // assuming req.body looks like: {userId: 1, preferences: ['American', 'Chinese']}
  const { userId } = req.body;
  const { preferences } = req.body;
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
userController.getPreferences = (req, res, next) => {
  // assuming they request based off a user's userId
  // otherwise swap to `...WHERE u.username='${req.body.username}'`
  const { userId } = req.body;
  const queryStr = `SELECT ft.food_type FROM food_types ft INNER JOIN user_food_prefs ufp on ft._id = ufp.food_type_id INNER JOIN users u ON u._id = ufp.user_id WHERE u._id = ${userId}`;
};

// add restaurant

// add restaurant to liked

// add restaurant to blocked

// remove restaurant from liked

// remove restaurant from blocked

// update user preferences

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

module.exports = userController;
