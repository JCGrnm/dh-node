const pgPromise = require("pg-promise");

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/main");

const setupDb = async () => {
  try {
    await db.none(`
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    );
  `);
    console.log("PostgresDb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, setupDb };
