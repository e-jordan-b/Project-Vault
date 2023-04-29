import setupDB, { request, app, User, Project } from '../utils/test-setup';
import * as bcrypt from 'bcrypt';

// Setup a Test Database
setupDB('endpoint-testing');

beforeEach(async () => {
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: await bcrypt.hash('password123', 10),
  });
  await user.save();
});

// Test cases for the login function
describe('POST /login', () => {
  it('should login successfully when email and password are correct', async () => {
    const response = await request(app).post('/login').send({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('firstName', 'John');
    expect(response.body).toHaveProperty('lastName', 'Doe');
    expect(response.body).toHaveProperty('email', 'john.doe@example.com');
  });

  it('should return a 400 error when email is missing', async () => {
    const response = await request(app).post('/login').send({
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Invalid email format'
    );
  });

  it('should return a 400 error when password is missing', async () => {
    const response = await request(app).post('/login').send({
      email: 'john.doe@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Password is required'
    );
  });

  it('should return a 401 error when the email is incorrect', async () => {
    const response = await request(app).post('/login').send({
      email: 'wrong.email@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password'
    );
  });

  it('should return a 401 error when the password is incorrect', async () => {
    const response = await request(app).post('/login').send({
      email: 'john.doe@example.com',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password'
    );
  });

  test('should have user info without password in the response', async () => {
    const response = await request(app).post('/login').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.password).toBe(undefined);
    expect(response.body).toHaveProperty('email', 'john.doe@example.com');
    expect(response.body.id).toBeDefined();
  });
});

// Test cases for the register function
describe('POST /register', () => {
  it('should register a new user with valid input', async () => {
    const response = await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('firstName', 'Jane');
    expect(response.body).toHaveProperty('lastName', 'Doe');
    expect(response.body).toHaveProperty('email', 'jane.doe@example.com');
  });

  it('should return a 400 error when email is missing', async () => {
    const response = await request(app).post('/register').send({
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Invalid email format'
    );
  });

  it('should return a 400 error when password is missing', async () => {
    const response = await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Password is required'
    );
  });

  it('should return a 400 error when first name is missing', async () => {
    const response = await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      password: 'password123',
      lastName: 'Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'First name is required'
    );
  });

  it('should return a 400 error when last name is missing', async () => {
    const response = await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      password: 'password123',
      firstName: 'Jane',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Last name is required'
    );
  });

  it('should return a 400 error when email format is invalid', async () => {
    const response = await request(app).post('/register').send({
      email: 'invalid_email',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Invalid email format'
    );
  });

  it('should return a 409 error when email is already in use', async () => {
    await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    const response = await request(app).post('/register').send({
      email: 'jane.doe@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'Email already in use');
  });

  test('should have user info without password in the response', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'john.does@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.password).toBe(undefined);
    expect(response.body).toHaveProperty('email', 'john.does@example.com');
    expect(response.body.id).toBeDefined();
  });
});
