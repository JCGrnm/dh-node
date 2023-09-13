const Joi = require("joi");
const express = require("express");
const router = express.Router();
const planetsController = require("../../controllers/planets");

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
router.get("/", planetsController.getAll);

/**
 * @route GET /api/planets/:id
 * @desc Get a planet by ID
 */
router.get("/:id", planetsController.getOneById);

/**
 * @route POST /api/planets
 * @desc Add a new planet
 */
router.post("/", validatePlanet, planetsController.create);

/**
 * @route PUT /api/planets/:id
 * @desc Update a planet by ID
 */
router.put("/:id", validatePlanet, planetsController.updateById);

/**
 * @route DELETE /api/planets/:id
 * @desc Delete a planet by ID
 */
router.delete("/:id", planetsController.deleteById);

module.exports = router;
