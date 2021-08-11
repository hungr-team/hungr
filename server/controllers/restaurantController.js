const db = require('../models/hungrModel');

const restaurantController = {};

// add restaurant
restaurantController.addRestaurant = async (req, res, next) => {
  const restaurantName = req.body.restaurantName;
  const address = req.body.address;
  // only adds if it's not already existing
  const queryStr = `INSERT INTO restaurants (name, address) SELECT DISTINCT '${restaurantName}', '${address}' WHERE '${address}' NOT IN (SELECT address FROM restaurants)`;
  try {
    await db.query(queryStr);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// add restaurant to liked
restaurantController.addLikedRestaurant = async (req, res, next) => {
  // add to liked restaurants a rest id and user id
  const username = req.body.username;
  const restaurant = req.body.restaurantName;
  // do a find to make sure it doesn't already exist
  const testQueryStr = `SELECT br._id FROM liked_restaurants br INNER JOIN users u ON br.user_id=u._id INNER JOIN restaurants r ON r._id=br.restaurant_id WHERE u.username='${username}' AND r.name='${restaurant}'`;
  try {
    const testIfExist = await db.query(testQueryStr);
    if (testIfExist.rows.length) {
      console.log(
        "This restaurant has already been added to user's liked list."
      );
      return next();
    } else {
      const queryStr = `INSERT INTO liked_restaurants (user_id, restaurant_id) SELECT u._id, r._id FROM users u, restaurants r WHERE r.name = '${restaurant}' AND u.username='${username}'`;
      try {
        const addedLikedRestaurant = await db.query(queryStr);
        return next();
      } catch (err) {
        console.log(err);
        return next(err);
      }
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// get liked list
restaurantController.getLikedRestaurants = async (req, res, next) => {
  // inner join to just get list of liked restaurants
  const username = req.body.username;
  const getLikesQueryStr = `SELECT r.name FROM liked_restaurants br INNER JOIN users u ON br.user_id=u._id INNER JOIN restaurants r ON r._id=br.restaurant_id WHERE u.username='${username}'`;
  try {
    const likedRestaurantRows = await db.query(getLikesQueryStr);
    const likedRestaurants = [];
    for (let i = 0; i < likedRestaurantRows.rows.length; i += 1) {
      likedRestaurants.push(likedRestaurantRows.rows[i].name);
    }
    console.log(likedRestaurants);
    res.locals.likedRestaurants = likedRestaurants;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// add restaurant to blocked
restaurantController.addBlockedRestaurant = async (req, res, next) => {
  const username = req.body.username;
  const restaurant = req.body.restaurantName;
  // do a find to make sure it doesn't already exist
  const testQueryStr = `SELECT br._id FROM blocked_restaurants br INNER JOIN users u ON br.user_id=u._id INNER JOIN restaurants r ON r._id=br.restaurant_id WHERE u.username='${username}' AND r.name='${restaurant}'`;
  try {
    const testIfExist = await db.query(testQueryStr);
    if (testIfExist.rows.length) {
      console.log(
        "This restaurant has already been added to user's blocked list."
      );
      return next();
    } else {
      const queryStr = `INSERT INTO blocked_restaurants (user_id, restaurant_id) SELECT u._id, r._id FROM users u, restaurants r WHERE r.name = '${restaurant}' AND u.username='${username}'`;
      try {
        const addedBlockedRestaurant = await db.query(queryStr);
        return next();
      } catch (err) {
        console.log(err);
        return next(err);
      }
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// get blocked list
restaurantController.getBlockedRestaurants = async (req, res, next) => {
  const username = req.body.username;
  const getLikesQueryStr = `SELECT r.name FROM blocked_restaurants br INNER JOIN users u ON br.user_id=u._id INNER JOIN restaurants r ON r._id=br.restaurant_id WHERE u.username='${username}'`;
  try {
    const blockedRestaurantRows = await db.query(getLikesQueryStr);
    // create new array with just the restaurant names as strings instead of individual objects
    const blockedRestaurants = [];
    for (let i = 0; i < blockedRestaurantRows.rows.length; i += 1) {
      blockedRestaurants.push(blockedRestaurantRows.rows[i].name);
    }
    res.locals.blockedRestaurants = blockedRestaurants;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// remove restaurant from liked
restaurantController.removeLikedRestaurant = async (req, res, next) => {
  const username = req.body.username;
  const restaurant = req.body.restaurantName;
  const deleteQuery = `DELETE FROM liked_restaurants WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${username}') AND restaurant_id IN (SELECT restaurants._id FROM restaurants WHERE restaurants.name='${restaurant}')`;
  try {
    const deleted = await db.query(deleteQuery);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// remove restaurant from blocked
restaurantController.removeBlockedRestaurant = async (req, res, next) => {
  const username = req.body.username;
  const restaurant = req.body.restaurantName;
  const deleteQuery = `DELETE FROM blocked_restaurants WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${username}') AND restaurant_id IN (SELECT restaurants._id FROM restaurants WHERE restaurants.name='${restaurant}')`;
  try {
    const deleted = await db.query(deleteQuery);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = restaurantController;
