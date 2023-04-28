import mongooseDb from '../db'; // this is the connection to the production database

(async () => {
  await mongooseDb.disconnect();
  await mongooseDb.connection.close();
})();

import mongoose from 'mongoose'; // this is for the test database

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

export default function setupDB(databaseName: string) {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
}

/*
ADD THIS TO THE TEST FILE

import * as setupDB from '../test-setup'

// Setup a Test Database
setupDB('endpoint-testing')




*/
