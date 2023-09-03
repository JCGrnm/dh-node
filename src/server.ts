// Importiamo le librerie necessarie
import { Request, Response } from "express";
require("dotenv").config(); // Carica variabili d'ambiente da un file .env - syntax/logic da 1tomany
const morgan = require("morgan"); // Importa modulo Morgan per il logging

const express = require("express");
require("express-async-errors");

// Creiamo app Express
const app = express();

// Impostiamo la porta in base alla variabile d'ambiente o 3000 di default
const { SERVER_PORT } = process.env;

// Middleware per accettare richieste JSON
app.use(express.json());

// Middleware per il logging delle richieste + Usa il formato di log "dev"
app.use(morgan("dev"));

// Simuliamo database pianeti
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Definiamo rotte per ottenere i dati dei pianeti

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello, this is root page!" });
});
app.get("/planets", async (req: Request, res: Response) => {
  return res.status(200).json(planets);
});
app.get("/planets/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  if (!planet) {
    return res.status(404).json({ message: "Planet not found" });
  }

  return res.status(200).json(planet);
});
// Avviamo il server
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});
