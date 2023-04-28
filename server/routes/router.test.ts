// import express from 'express';
import app from '../app';
import router from './router';
import { describe, test } from '@jest/globals';
import request from 'supertest';

describe('GET /project Routes test', () => {
  app.use(router);
  test('Route /projects endpoint should return a 200 status code: ', async () => {
    await request(app).get('/projects').expect(200)
  })
  test('Route /projects endpoint should return a 405 status code: ', async () => {
    await request(app).post('/projects').expect(405)
  })
  test('Route /projects endpoint should return json content-type: ', async () => {
    await request(app).get('/projects').expect('Content-Type', /json/)
  })
  
  test('Route /projects/:id endpoint should return a 200 status code: ', async () => {
    await request(app).get('/projects/222').expect(200)
  })
  test('Route /projects/:id endpoint should return a 405 status code: ', async () => {
    await request(app).post('/projects/222').expect(405)
  })
  test('Route /projects/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/222').expect('Content-Type', /json/)
  })
  
  test('Route /projects/following/:id endpoint should return a 200 status code: ', async () => {
    await request(app).get('/projects/following/222').expect(200)
  })
  test('Route /projects/following/:id endpoint should return a 405 status code: ', async () => {
    await request(app).post('/projects/following/222').expect(405)
  })
  test('Route /projects/following/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/following/222').expect('Content-Type', /json/)
  })

  test('Route /projects/personal/:id endpoint should return a 200 status code: ', async () => {
    await request(app).get('/projects/personal/222').expect(200)
  })
  test('Route /projects/personal/:id endpoint should return a 405 status code: ', async () => {
    await request(app).post('/projects/personal/222').expect(405)
  })
  test('Route /projects/personal/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/personal/222').expect('Content-Type', /json/)
  })
})

describe('POST /create Routes test', () => {
  app.use(router);
  test('Route /create endpoint should return a 201 status code: ', async () => {
    await request(app).post('/create').expect(201)
  })
  test('Route /create endpoint should return content-type json: ', async () => {
    await request(app).post('/create').expect('Content-Type', /json/)
  })
  test('Route /projects/follow endpoint should return a 201 status code: ', async () => {
    await request(app).post('/projects/follow').expect(201)
  })
  test('Route /projects/follow endpoint should return content-type json: ', async () => {
    await request(app).post('/projects/follow').expect('Content-Type', /json/)
  })
  test('Route /projects/comments endpoint should return a 201 status code: ', async () => {
    await request(app).post('/projects/comments').expect(201)
  })
  test('Route /projects/comments endpoint should return content-type json: ', async () => {
    await request(app).post('/projects/comments').expect('Content-Type', /json/)
  })
})

describe('POST Login and Register routes should return 201 status code', () => {
  app.use(router);
  test('Route /login should return a 201 status code', async () => {
    await request(app).post('/login').expect(201)
  })
  test('Route /login should return content-type json', async () => {
    await request(app).post('/login').expect('Content-Type', /json/)
  })
  test('Route /register should return a 201 status code', async () => {
    await request(app).post('/register').expect(201)
  })
  test('Route /register should return content-type json', async () => {
    await request(app).post('/register').expect('Content-Type', /json/)
  })
})

describe('POST /create-payment-intent should return 201 status code', () => {
  app.use(router);
  test('Route /create-payment-intent should return a 201 status code', async () => {
    await request(app).post('/create-payment-intent').expect(201)
  })
  test('Route /create-payment-intent should return content-type json', async () => {
    await request(app).post('/create-payment-intent').expect('Content-Type', /json/)
  })
})

describe('POST /update/:id', () => {
  app.use(router);
  test('Route /update/:id should return a 201 status code', async () => {
    await request(app).post('/update/222').expect(201)
  })
  test('Route /update/:id should return content-type json', async () => {
    await request(app).post('/update/222').expect('Content-Type', /json/)
  })
})