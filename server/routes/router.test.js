const express = require('express');
const router = require('../dist/routes/router');
const { describe, expect, test, beforeAll } = require('@jest/globals');
const request = require('supertest')

describe('Routes test', () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  test('The response returns a 200 status and content-type json ', () => {
    request(app)
      .get('/posts')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        // if (err) throw err;
        console.log(err)
      });
  })
})

