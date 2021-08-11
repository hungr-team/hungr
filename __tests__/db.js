const userController = require('../server/controllers/userController');
const db = require('../server/models/hungrModel');
// const { response } = require('express');
// const makeApp = require('../__mocks__/mockServer');
const request = require('supertest');

const query = jest.fn();
// const userController = makeApp({ query });
describe('User Controller', () => {
  const req = {};
  req.body = {
    username: 'testUsername',
    password: 'testPassword',
  };
  const res = {};
  describe('Adding a new user', () => {
    it('adds a new user to db', async () => {
      const response = await userController.addUser(req, res, query);
      //   expect(query.mock.calls[0][0]).toBe(req.body.username);
      const checked = await db.query(
        `SELECT username, password FROM users WHERE username='${req.body.username}'`
      );
      expect(checked.rows[0].password).toEqual(req.body.password);
    });
  });

  afterAll(async () => {
    await db.query(`DELETE FROM users WHERE username='req.body.username'`);
  });
});
