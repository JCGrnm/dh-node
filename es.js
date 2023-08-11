const fs = require("fs").promises;

async function writeToFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log("Il file è stato scritto con successo.");
  } catch (err) {
    console.error("Si è verificato un errore nella scrittura del file:", err);
  }
}

const filePath = "es-out.txt";
const content = "ciao 1234";

writeToFile(filePath, content);
