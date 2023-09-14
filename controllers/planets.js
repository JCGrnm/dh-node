const Joi = require("joi");

const { db } = require("../db/index.js");

const getAll = async (_, res) => {
  try {
    const planets = await db.many(`SELECT * FROM planets`);
    return res.status(200).json({ planets });
  } catch (error) {
    if (error.name === "QueryError") {
      return res.status(404).json({ message: "oops, no planets found!" });
    } else {
      return res.status(500).json(error);
    }
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await db.one(
      `SELECT * FROM planets WHERE id=$1`,
      Number(id)
    );
    return res.status(200).json(planet);
  } catch (error) {
    if (error.name === "QueryResultError") {
      return res.status(500).json({ message: "Oops, planet not found." });
    } else return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({ "any.required": "Name is required" }),
    });
    await schema.validateAsync(req.body);

    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);

    return res.status(201).json({ msg: "Planet succesfully added!" });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(500).json({ msg: error.details[0].message });
    } else if (error.name === "QueryResultError") {
      return res.status(404).json({ msg: error.message });
    } else return res.status(500).json(error);
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);

    const result = await db.result(`UPDATE planets SET name=$2 WHERE id=$1`, [
      Number(id),
      name,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "No planet found!" });
    }

    return res.status(200).json({ msg: "Planet added!" });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(500).json({ msg: error.details[0].message });
    } else return res.status(500).json(error);
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePlanet = await db.result(
      `DELETE FROM planets WHERE id=$1`,
      Number(id)
    );

    if (deletePlanet.rowCount === 0) {
      return res.status(404).json({ message: "No planet to delete!" });
    }

    return res.status(200).json({ msg: "Planet successfully deleted!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAll, getOneById, create, updateById, deleteById };
