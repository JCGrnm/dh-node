import * as dotenv from "dotenv";
dotenv.config();
import { db } from "./db.js";
import jwt from "jsonwebtoken";

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.one(
    `SELECT * FROM develhope.users WHERE username=$1`,
    username
  );

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };
    const { SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);
    console.log(token);

    await db.none(`UPDATE develhope.users SET token=$2 WHERE id=$1`, [
      user.id,
      token,
    ]);
    res.status(201).json({ id: user.id, username, token });
  } else {
    return res.status(400).json({ msg: "Username or password incorrect" });
  }
};
const signUp = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.oneOrNone(
    `SELECT * FROM develhope.users WHERE username=$1`,
    username
  );

  if (user) {
    res.status(409).json({ msg: "Username already exists" });
  } else {
    const { id } = await db.one(
      `INSERT INTO develhope.users (username, password) VALUES ($1, $2) RETURNING id`,
      [username, password]
    );
    res.status(201).json({ id, msg: "User created successfully." });
  }
};

const logOut = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield db.none(`UPDATE users SET token=$2 WHERE id=$1`, [
      user === null || user === void 0 ? void 0 : user.id,
      null,
    ]);
    res.status(200).json({ msg: "Logout was successful" });
  });

export { logIn, signUp, logOut };
