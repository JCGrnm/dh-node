import pgPromise from "pg-promise";

const db = pgPromise({})(
  "postgres://postgres:postgres@localhost:5432/postgres"
);

const setupDb = async () => {
  await db.none(`
        DROP TABLE IF EXISTS develhope.planets;

        CREATE TABLE develhope.planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );

        DROP TABLE IF EXISTS develhope.users;
        CREATE TABLE develhope.users (
            id SERIAL NOT NULL PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            token TEXT
        );
    `);

  await db.none(`INSERT INTO develhope.planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO develhope.planets (name) VALUES ('Mars')`);

  await db.none(
    `INSERT INTO develhope.users (username, password) VALUES ('dummy', 'dummy') `
  );
};
setupDb();

export { db };
