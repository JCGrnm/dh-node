import Joi from "joi";
import { db } from "./db.js";

const getAll = async (req, res) => {
  const planets = await db.many("SELECT * FROM develhope.planets;");
  res.status(200).json(planets);
};

const getOnById = async (req, res) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    "SELECT * FROM develhope.planets WHERE id=$1",
    Number(id)
  );
  res.status(200).json(planet);
};

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const create = async (req, res) => {
  const { name } = req.body;
  const newPlanet = { name };
  const validatedPlanet = planetSchema.validate(newPlanet);
  if (validatedPlanet.error) {
    return res
      .status(400)
      .json({ msg: validatedPlanet.error.details[0].message });
  } else {
    await db.none("INSERT INTO develhope.planets (name) VALUES ($1)", name);
    res.status(201).json({ msg: `planet ${name} created` });
  }
};

const createImage = async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  if (!file?.filename) {
    res.status(400).json({ error: "upload file failed" });
    return;
  }
  await db.none("UPDATE develhope.planets SET image=$2 WHERE id=$1", [
    id,
    file.path,
  ]);
  res.status(201).json({ msg: "image uploaded successfully" });
  console.log(file?.path);
};

const updatedById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ msg: "id required" });
    return;
  }
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ msg: "name required" });
    return;
  }
  await db.none("UPDATE develhope.planets SET name=$1 WHERE id=$2", [name, id]);
  res.status(200).json({ msg: `planet ${name} was updated` });
};

const deleteByID = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ msg: "id required" });
    return;
  }
  await db.none("DELETE FROM develhope.planets WHERE id=$1", id);
  res.status(200).json({ msg: `planet ${id} was deleted` });
};

export { getAll, getOnById, create, createImage, updatedById, deleteByID };
