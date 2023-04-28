import mongoose from 'mongoose'; // this is for the test database
import express from 'express';
import router from '../routes/router';
import request from 'supertest';
import User from '../models/userModel';
import Project from '../models/projectModel';

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (e) {
      const error = e as Error;
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running'))
        return;
      console.log(error.message);
    }
  }
}
const app = express();

export { request, app, User, Project };

export default function setupDB(databaseName: string) {
  app.use(express.json());
  app.use(router);

  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${databaseName}`;
    await mongoose.connect(url);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    // await dropAllCollections();
    await mongoose.connection.close();
  });
}

/*
ADD THIS TO THE TEST FILE

import setupDB, { request, app, User, Project } from '../utils/test-setup';

// Setup a Test Database
setupDB('endpoint-testing');




*/
