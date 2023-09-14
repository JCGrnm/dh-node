const passport = require("passport");
const passportJWT = require("passport-jwt");
const { db } = require("../db");

const { SECRET } = process.env;
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
passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id);
      console.log(user);

      try {
        return user ? done(null, user) : done(new Error("user not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
