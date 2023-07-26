import * as testDatabase from "./database";

let previousNodeEnv;

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await testDatabase.connect();

  previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "test";
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await testDatabase.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  jest.clearAllTimers();
  jest.clearAllMocks();
  await testDatabase.closeDatabase();
  process.env.NODE_ENV = previousNodeEnv;
});
