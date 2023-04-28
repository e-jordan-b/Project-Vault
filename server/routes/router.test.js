const express = require('express');
const router = require('../dist/routes/router');
const { describe, expect, test, beforeAll } = require('@jest/globals');
const request = require('supertest')

describe('Routes test', () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  test('The /posts endpoint should return a 200', async () => {
    await request(app).get('/posts').expect(200)
    
  })
})

