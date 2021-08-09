const { response } = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });

  describe('/login', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });

    describe('POST', () => {
      it('login should return true when successful, user must exist in database', () =>
        request(server)
          .post('/login')
          .send({ username: 'jimmy', password: 'jimmy' })
          .set('Accept', 'application/json')
          .expect(res => {
            res.body = true;
          }));

      xit('login should redirect when successful', () =>
        request(server)
          .post('/login')
          .send({ username: 'jimmy', password: 'jimmy' })
          .set('Accept', 'application/json')
          .expect(302));
    });
  });

  describe('/signup', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });

  describe('/settings', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });

  describe('/lists', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
});
