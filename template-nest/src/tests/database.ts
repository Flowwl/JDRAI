import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

export let mongoTestServer: MongoMemoryServer | undefined;

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  mongoTestServer = await MongoMemoryServer.create();
  const uri = mongoTestServer.getUri();

  await mongoose.connect(uri, {});
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoTestServer?.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};
