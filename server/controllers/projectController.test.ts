import setupDB, { request, app, User, Project } from '../utils/test-setup';

// Setup a Test Database
setupDB('endpoint-testing');

describe('Project', () => {
  describe('If the project is empty', () => {
    it('should return a 400 error', async () => {
      const response = await request(app).post('/create').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Could not create project');
    });
  });
  describe('If Mongoose schema is not respected', () => {
    it('should return a 400 error', async () => {
      const project = {
        id: 111,
        title: 111,
      };
      const response = await request(app).post('/create').send(project);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Could not create project');
    });
  });
  describe('If the project fits the schema and posted successfully', () => {
    it('should return a 201 status', async () => {
      const project = {
        id: '333',
        title: 'Ivan project 2',
        // description: '11111',
        // image: 'string',
        // updates: [],
        // author: 'string',
        user: { _id: '644b9b68716fa4fc043f54db' },
        // date: 'string',
        // chat: [],
        // tags: 'string string',
        // followers: [],
      };
      const response = await request(app).post('/create').send(project);
      expect(response.status).toBe(201);
    });
  });
});

describe('Get the projects', () => {
  it('should return all projects', async () => {
    const project = {
      id: '666',
      title: 'Test project 6',
      user: { _id: '666b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    const response = await request(app).get('/projects');
    expect(response.status).toBe(201);
    expect(response.body.project[0].id).toBe('666');
  });

  it('should return a project by ID', async () => {
    const project = {
      id: '333',
      title: 'Test project 2',
      user: { _id: '644b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    const response = await request(app).get('/projects/333');
    expect(response.status).toBe(201);
    expect(response.body.project).toHaveProperty('title', 'Test project 2');
  });

  it('should throw error if ID does not exist', async () => {
    const project = {
      id: '777',
      title: 'Test project 7',
      user: { _id: '666b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    const response = await request(app).get('/projects/667');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'cannot find project');
  });
});

describe('Follow projects', () => {
  it('should throw error if cannot follow', async () => {
    const response = await request(app).post('/projects/follow');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'cannot follow');
  });
  it('should allow any user to follow projects', async () => {
    const user = await request(app).post('/register').send({
      _id: '544b9b68716fa4fc043f54db',
      email: 'jane.doe@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });
    const project = {
      id: '888',
      title: 'Test project 8',
      user: { _id: '544b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    const response = await request(app).post('/projects/follow').send(project);
    expect(response.status).toBe(201);
  });
});
