const userController = require('../server/controllers/userController');
const restaurantController = require('../server/controllers/restaurantController');
const db = require('../server/models/hungrModel');

const mockNext = jest.fn();
// const userController = makeApp({ query });
describe('User Controller', () => {
  const req = {};
  req.body = {
    username: 'testUsername2021',
    password: 'testPassword2021',
  };
  const mockRes = { locals: {} };
  afterAll(async () => {
    await db.query(`DELETE FROM users WHERE username='${req.body.username}'`);
  });
  describe('Adding a new user', () => {
    it('adds a new user to db', async () => {
      await userController.addUser(req, mockRes, mockNext);
      const checked = await db.query(
        `SELECT username, password FROM users WHERE username='${req.body.username}'`
      );
      expect(checked.rows[0].password).toEqual(req.body.password);
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
  describe('User radius', () => {
    req.body.radius = 5500;
    it('sets a default radius', async () => {
      await userController.getRadius(req, mockRes, mockNext);
      expect(mockRes.locals).toEqual({ userRadius: '4800' });
      expect(mockNext).toHaveBeenCalledTimes(2);
    });
    it("updates a user's radius correctly", async () => {
      await userController.updateRadius(req, mockRes, mockNext);
      await userController.getRadius(req, mockRes, mockNext);
      expect(mockRes.locals).toEqual({ userRadius: '5500' });
      expect(mockNext).toHaveBeenCalledTimes(4);
    });
  });
});

describe('Restaurant Controller', () => {
  const req = {};
  req.body = {
    username: 'restaurantTestUsername2021',
    password: 'restaurantTestPassword2021',
  };
  const mockRes = { locals: {} };
  const goodMockRestaurant = 'Good Place to Eat';
  const badMockRestaurant = 'Bad Place to Eat';
  beforeAll(async () => {
    await userController.addUser(req, mockRes, mockNext);
    mockNext.mockReset();
  });
  afterAll(async () => {
    await db.query(
      `DELETE FROM liked_restaurants WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${req.body.username}') AND restaurant_id IN (SELECT restaurants._id FROM restaurants WHERE restaurants.name='${goodMockRestaurant}')`
    );
    await db.query(
      `DELETE FROM blocked_restaurants WHERE user_id IN (SELECT users._id FROM users WHERE users.username='${req.body.username}') AND restaurant_id IN (SELECT restaurants._id FROM restaurants WHERE restaurants.name='${badMockRestaurant}')`
    );
    await db.query(
      `DELETE FROM restaurants WHERE name='${goodMockRestaurant}'`
    );
    await db.query(`DELETE FROM restaurants WHERE name='${badMockRestaurant}'`);
    await db.query(`DELETE FROM users WHERE username='${req.body.username}'`);
  });
  describe('Adding a new restaurant', () => {
    it('Adds a new restaurant to the database', async () => {
      req.body.restaurantName = goodMockRestaurant;
      req.body.address = '123 East Street, Nowhere Town, AK';
      await restaurantController.addRestaurant(req, mockRes, mockNext);
      const checked = await db.query(
        `SELECT name, address FROM restaurants WHERE name='${req.body.restaurantName}'`
      );
      expect(checked.rows[0].name).toEqual(req.body.restaurantName);
      expect(checked.rows[0].address).toEqual(req.body.address);
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
  describe('Adding a restaurant to liked list', () => {
    it("Adds a restaurant to user's liked list", async () => {
      req.body.restaurantName = goodMockRestaurant;
      await restaurantController.addLikedRestaurant(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2);
    });
    it("Is able to retrieve user's liked list and it's been added to", async () => {
      await restaurantController.getLikedRestaurants(req, mockRes, mockNext);
      expect(mockRes.locals.likedRestaurants).toEqual([
        `${goodMockRestaurant}`,
      ]);
      expect(mockNext).toHaveBeenCalledTimes(3);
    });
  });
  describe('Adding a restaurant to blocked list', () => {
    it("Adds a restaurant to a user's blocked likst", async () => {
      req.body.restaurantName = badMockRestaurant;
      req.body.address = '987 West Street, Somewhere Town, KS';
      await restaurantController.addRestaurant(req, mockRes, mockNext);
      await restaurantController.addBlockedRestaurant(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(5);
    });
    it("Is able to retrieve user's blocked list and it's been added to", async () => {
      await restaurantController.getBlockedRestaurants(req, mockRes, mockNext);
      expect(mockRes.locals.blockedRestaurants).toEqual([
        `${badMockRestaurant}`,
      ]);
      expect(mockNext).toHaveBeenCalledTimes(6);
    });
  });
  describe('Removing a restaurant from liked list', () => {
    it('Removes a restaurant from liked list', async () => {
      req.body.restaurantName = goodMockRestaurant;
      await restaurantController.removeLikedRestaurant(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(7);
    });
    it("No longer exists in user's liked list", async () => {
      await restaurantController.getLikedRestaurants(req, mockRes, mockNext);
      expect(mockRes.locals.likedRestaurants).toEqual([]);
      expect(mockNext).toHaveBeenCalledTimes(8);
    });
  });
  describe('Removing a restaurant from blocked list', () => {
    it('Removes a restaurant from blocked list', async () => {
      req.body.restaurantName = badMockRestaurant;
      await restaurantController.removeBlockedRestaurant(
        req,
        mockRes,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledTimes(9);
    });
    it("No longer exists in user's blocked list", async () => {
      await restaurantController.getBlockedRestaurants(req, mockRes, mockNext);
      expect(mockRes.locals.blockedRestaurants).toEqual([]);
      expect(mockNext).toHaveBeenCalledTimes(10);
    });
  });
});
