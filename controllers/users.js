const { db } = require("../db");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const signup = async (req, res) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    const data = await schema.validateAsync(req.body);

    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE username=$1`,
      username
    );

    if (user) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;

    await db.none(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
      data.username,
      data.password,
    ]);

    return res
      .status(200)
      .json({ message: "Signup successful. You can now log in." });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);

    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE username=$1`,
      username
    );

    if (!user) {
      return res.status(404).json({ message: "Invalid login credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    const payload = {
      id: user.id,
      username,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    await db.none("UPDATE users SET token=$2 WHERE id=$1", [user.id, token]);

    return res.status(200).json({ token, username });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, signup };
