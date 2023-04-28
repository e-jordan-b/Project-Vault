import request from 'supertest';
import User from '../models/userModel';
import app from '../app';

import setupDB from '../utils/test-setup';

// Setup a Test Database
setupDB('endpoint-testing');

describe.only('USER CONTROLLER TESTS', () => {
  describe('post /login', () => {
    it('should return 401 if the user is not found', async () => {
      const res = await request(app).post('/login').send({
        email: 'incorrectemail@aa.com',
        password: 'password',
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe(401);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should return 401 if the password is incorrect', async () => {
      const res = await request(app).post('/login').send({
        email: 'aa@aa.com',
        password: 'incorrectpassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe(401);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should return 400 if email is not provided', async () => {
      const res = await request(app).post('/login').send({
        password: 'password',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe('email and password are required');
    });

    it('should return 400 if password is not provided', async () => {
      const res = await request(app).post('/login').send({
        email: 'aa@aa.com',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe('email and password are required');
    });

    it('should return 200 if user is logged in', async () => {
      const res = await request(app).post('/login').send({
        email: 'aa@aa.com',
        password: 'password',
      });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe('Success');
    });
  });

  describe('post /register', () => {
    it('should return 409 if email is already used', async () => {
      await request(app).post('/register').send({
        email: 'newUser@aa.com',
        password: 'password',
      });

      const res = await request(app).post('/register').send({
        email: 'newUser@aa.com',
        password: 'password',
      });
      expect(res.status).toBe(409);
      expect(res.body.status).toBe(409);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe('Username already taken');
    });

    it('should return 201 if user is created', async () => {
      const res = await request(app).post('/register').send({
        email: 'newUser@aa.com',
        password: 'password',
      });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe(201);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe('User created successfully');
    });

    it('should return 400 if email is in the wrong format', async () => {
      const res = await request(app).post('/register').send({
        email: 'newUser@aa',
        password: 'password',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe({
        validationError: 'email must be in the correct format',
      });
    });

    it('should have user info without password in the response', async () => {
      const res = await request(app).post('/register').send({
        email: 'newUser@aa.com',
        password: 'password',
      });
      expect(res.body.data.password).toBe(undefined);
      expect(res.body.data.email).toBe('newUser@aa.com');
      expect(res.body.data.id).toBeDefined();
    });
  });
});
