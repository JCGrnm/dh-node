const express = require("express");
const app = express.Router();
const Joi = require("joi");
const planets = require("../../db");
const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} = require("../../controllers/planets");

/**
 * @route GET /api/planets
 * @desc Get all planets
 */
app.get("/", getAll);

/**
 * @route GET /api/planets/:id
 * @desc Get a planet by ID
 */
app.get("/:id", getOneById);

/**
/**
 * @route POST /api/planets
 * @desc Add a new planet
 */
app.post("/", create);

/**
 * @route PUT /api/planets/:id
 * @desc Update a planet by ID
 */

app.put("/:id", updateById);

/**
 * @route DELETE /api/planets/:id
 * @desc Delete a planet by ID
 */
app.delete("/:id", deleteById);

module.exports = app;
