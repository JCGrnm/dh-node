//provato sia con app.get che router.get...  module.exports = app / router;
// funzionano entrambi

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const planets = require("../../db/planetsDb");

// Middleware
function validatePlanet(planet) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(planet);
}

/**
 * @route GET /api/planets
 * @desc Get all planets
 */

app.get("/", async (_, res) => {
  return res.status(200).json({ planets });
});

/**
 * @route GET /api/planets/:id
 * @desc Get a planet by ID
 */

app.get("/:id", async (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Oops, planet not found." });
  res.json(planet);
});

/**
 * @route POST /api/planets
 * @desc Add a new planet
 */

app.post("/", async (req, res) => {
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

  const planetExists = planets.some(
    (planet) => planet.id === Number(id) || planet.name === name
  );

  if (planetExists) {
    return res.status(400).json({ msg: "Planet already exists!" });
  }

  const newPlanet = { id: Number(id), name };
  planets.push(newPlanet);

  return res.status(201).json({ msg: "Planet added!" });
});

/**
 * @route PUT /api/planets/:id
 * @desc Update a planet by ID
 */
app.put("/:id", async (req, res) => {
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

  const planetIndex = planets.findIndex((planet) => planet.id === Number(id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Oops, planet not found!" });
  }

  planets[planetIndex].name = name;

  return res.status(200).json({ msg: "Planet successfully updated!" });
});

/**
 * @route DELETE /api/planets/:id
 * @desc Delete a planet by ID
 */
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const planetIndex = planets.findIndex((planet) => planet.id === parseInt(id));
  if (planetIndex === -1)
    return res.status(404).json({ msg: "Planet not found." });

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet successfully deleted!" });
});

module.exports = app;
