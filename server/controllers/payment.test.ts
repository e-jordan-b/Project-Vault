import app from '../app';
import router from '../routes/router';
import { describe, test } from '@jest/globals';
import request from 'supertest';

describe('Stripe', () => {
  app.use(router);

  test.only('Stripe test are happening', () => {
    console.log('Yes!')
  })

  // test('Route /projects endpoint should return a 200: ', async () => {
  //   await request(app).get('/projects').expect(200).expect('Content-Type', /json/)
  // })
})