/* eslint-disable semi */
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
/* eslint-disable semi */
// const request = require('supertest');
// const app = require('./app.js');
// import mongoose from 'mongoose';

describe('Project', () => {
  let con;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe('Testing the server used for test', () => {
    it('should successfully set & get information from the database', async () => {
      const db = con.db(mongoServer.instanceInfo.dbName);

      expect(db).toBeDefined();
      const col = db.collection('test');
      const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
      expect(result.insertedCount).toStrictEqual(2);
      expect(await col.countDocuments({})).toBe(2);
    });
  });
});
