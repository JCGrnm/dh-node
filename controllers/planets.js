const planetsDb = require("../db/planetsDb");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
router.use(express.json());

// Ottieni tutti i pianeti
const getAll = async (_, res) => {
  return res.status(200).json({ planets: planetsDb });
};

// Ottieni un pianeta per ID
const getOneById = (req, res) => {
  const planet = planetsDb.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Oops, planet not found." });
  res.json(planet);
};

// Crea un nuovo pianeta
const create = async (req, res) => {
  const { id, name } = req.body;
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ msg: e.details[0].message });
  }

  const planetExists = planetsDb.some(
    (planet) => planet.id === Number(id) || planet.name === name
  );

  if (planetExists) {
    return res.status(400).json({ msg: "Planet already exists!" });
  }

  const newPlanet = { id: Number(id), name };
  planetsDb.push(newPlanet);

  return res.status(201).json({ msg: "Planet added!" });
};

// Aggiorna un pianeta per ID
const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ msg: e.details[0].message });
  }

  const planetIndex = planetsDb.findIndex((planet) => planet.id === Number(id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Oops, planet not found!" });
  }

  planetsDb[planetIndex].name = name;

  return res.status(200).json({ msg: "Planet successfully updated!" });
};
// Cancella un pianeta per ID
const deleteById = async (req, res) => {
  const { id } = req.params;

  const planetIndex = planetsDb.findIndex(
    (planet) => planet.id === parseInt(id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ msg: "Planet not found." });

  planetsDb.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet successfully deleted!" });
};

module.exports = { getAll, getOneById, create, updateById, deleteById };
