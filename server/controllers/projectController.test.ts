import setupDB, { request, app, User, Project } from '../utils/test-setup';

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
        title: 'Ivan project 2',
        description: 'test',
        createdBy: { _id: '645118402c10e99219a5e323' },
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
    expect(response.status).toBe(200);
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
    await request(app).post('/register').send({
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
    expect(response.status).toBe(200);
  });
});

describe('Add updates to project', () => {
  it('should throw error if cannot update', async () => {
    const update = {
      id: 're9r04549083543',
      title: 'New update',
      description: 'Description',
      date: Date.now(),
      image: 'Image string',
      video: 'Video string',
      chat: ['one', 'two'],
    };
    const response = await request(app)
      .post(`/update/587493875943875439875349875`)
      .send(update);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'cannot update');
  });
  it('should create updates', async () => {
    const project = {
      id: '444',
      title: 'Test project 444',
      user: { _id: '444b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    const update = {
      id: project.id,
      title: 'New update',
      description: 'Description',
      date: Date.now(),
      image: 'Image string',
      video: 'Video string',
      chat: ['one', 'two'],
    };
    const response = await request(app)
      .post(`/update/${project.id}`)
      .send(update);
    expect(response.status).toBe(201);
  });
});

describe('Following projects', () => {
  it('should allow user to follow', async () => {
    const user = {
      _id: '999b9b68716fa4fc043f54db',
      email: '9ane.doe@example.com',
      password: 'password123',
      firstName: '9Jane',
      lastName: '9Doe',
    };
    await request(app).post('/register').send(user);
    const project = {
      id: '999',
      title: 'Test project 9',
      user: { _id: '999b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    await request(app).post('/projects/follow').send(project);
    const response = await request(app)
      .get(`/projects/following/${user._id}`)
      .send(user);
    expect(response.status).toBe(200);
  });
});

describe('Personal projects', () => {
  it(`should shows user's own projects`, async () => {
    const user = {
      _id: '999b9b68716fa4fc043f54db',
      email: '9ane.doe@example.com',
      password: 'password123',
      firstName: '9Jane',
      lastName: '9Doe',
    };
    await request(app).post('/register').send(user);
    const project = {
      id: '999',
      title: 'Test project 9',
      user: { _id: '999b9b68716fa4fc043f54db' },
    };
    await request(app).post('/create').send(project);
    await request(app).post('/projects/follow').send(project);
    const response = await request(app)
      .get(`/projects/personal/${user._id}`)
      .send(user);
    expect(response.status).toBe(200);
  });
});

describe('Chat', () => {
  it('should add new comment to the chat', async () => {
    const comment = {
      createdBy: '999b9b68716fa4fc043f54db',
      comment: 'New chat comment',
      date: Date.now(),
    };
    const response = await request(app)
      .post(`/projects/comments`)
      .send(comment);
    expect(response.status).toBe(201);
  });
});
