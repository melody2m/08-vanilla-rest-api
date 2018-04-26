'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { color: 'yellow', texture: 'chewy' };
let mockId = null; 

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/veggie', () => {
    it('should respond with status 201 and create a new veggie', () => {
      return superagent.post(`:${testPort}/api/veggie`)
        .send(mockResource)
        .then((res) => {
          console.log(res.body);
          mockId = res.body.id; 
          expect(res.body.color).toEqual(mockResource.color);
          expect(res.body.texture).toEqual(mockResource.texture);
          expect(res.status).toEqual(201);
        });
    });
  });
  describe('GET /api/veggie', () => {
    it('should respond with status 201 get the veggie data', () => {
      return superagent.get(`:${testPort}/api/veggie`)
        .then((res) => {
          console.log(res.body);
          expect(res.body.color).toEqual(mockResource.color);
          expect(res.body.texture).toEqual(mockResource.texture);
          expect(res.status).toEqual(201);
        });
    });
  });
  describe('DELETE /api/veggie', () => {
    it('should respond with status 201 get the veggie data', () => {
      return superagent.delete(`:${testPort}/api/veggie`)
        .then((res) => {
          console.log(res.body);
          expect(res.body).toEqual(null);
        });
    });
  });
});
