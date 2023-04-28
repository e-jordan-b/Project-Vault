// import express from 'express';
import app from '../app';
import router from './router';
import { describe, test } from '@jest/globals';
import request from 'supertest';

describe('GET /project Routes test', () => {
  app.use(router);

  test('Route /projects endpoint should return a 200: ', async () => {
    await request(app).get('/projects').expect(200).expect('Content-Type', /json/)
  })
  test('Route /projects endpoint should return json content-type: ', async () => {
    await request(app).get('/projects').expect('Content-Type', /json/)
  })
  
  test('Route /projects/:id endpoint should return a 200: ', async () => {
    await request(app).get('/projects/222').expect(200).expect('Content-Type', /json/)
  })
  test('Route /projects/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/222').expect('Content-Type', /json/)
  })
  
  test('Route /projects/following/:id endpoint should return a 200: ', async () => {
    await request(app).get('/projects/following/222').expect(200).expect('Content-Type', /json/)
  })
  test('Route /projects/following/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/following/222').expect('Content-Type', /json/)
  })

  test('Route /projects/personal/:id endpoint should return a 200: ', async () => {
    await request(app).get('/projects/personal/222').expect(200).expect('Content-Type', /json/)
  })
  test('Route /projects/personal/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/personal/222').expect('Content-Type', /json/)
  })
})

describe('POST /project Routes test', () => {
  app.use(router);

  test('Route /projects endpoint should return a 201: ', async () => {
    await request(app).get('/projects').expect(201).expect('Content-Type', /json/)
  })
  test('Route /projects endpoint should return json content-type: ', async () => {
    await request(app).get('/projects').expect('Content-Type', /json/)
  })
  
  test('Route /projects/:id endpoint should return a 201: ', async () => {
    await request(app).get('/projects/222').expect(201).expect('Content-Type', /json/)
  })
  test('Route /projects/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/222').expect('Content-Type', /json/)
  })
  
  test('Route /projects/following/:id endpoint should return a 201: ', async () => {
    await request(app).get('/projects/following/222').expect(201).expect('Content-Type', /json/)
  })
  test('Route /projects/following/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/following/222').expect('Content-Type', /json/)
  })

  test('Route /projects/personal/:id endpoint should return a 201: ', async () => {
    await request(app).get('/projects/personal/222').expect(201).expect('Content-Type', /json/)
  })
  test('Route /projects/personal/:id endpoint should return json content-type: ', async () => {
    await request(app).get('/projects/personal/222').expect('Content-Type', /json/)
  })
})


