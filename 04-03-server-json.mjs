/* CONSEGNA:

Il nostro server HTTP ora invia un corpo di risposta JSON.
-Cambia la posizione nella risposta in "Marte".
-Esegui il server e fai una richiesta ad esso con curl usando l'opzione --verbose.
-Quale è il valore dell'intestazione di risposta Content-Length?
---------------------------------------------------------------------------------
Risposta: (20 con Earth) 19 con Mars. */

import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  // Creiamo i dati JSON da inviare
  const jsonResponseBody = JSON.stringify({ location: "Mars" });

  response.setHeader(
    "Content-Length",
    Buffer.byteLength(jsonResponseBody, "utf-8")
  );
  /* SPIEGAZIONE :
  Questa riga imposta l'intestazione "Content-Length" nella risposta.
  È come mettere un'etichetta su un pacco che dice quanto è grande il contenuto.

  Quando il client riceve la risposta, sa quanto è grande il contenuto in byte.
  Questo aiuta il client a gestire la risposta più efficientemente.

  Stiamo inviando una risposta JSON al client: "Ehi, questi dati JSON hanno X byte."

  Con queste info, il client può prepararsi a ricevere i dati senza dover aspettare.

  Usiamo il metodo statico Buffer.byteLength(string[encoding]) per calcolare la lunghezza in byte.

  Ora il client può iniziare a elaborare la risposta e mostrarla all'utente.
*/
  response.end(jsonResponseBody);
  /*
^--- qui è dove inviamo effettivamente i dati JSON al client,
  dopo avergli comunicato quanto è grande il contenuto.
  È come consegnare un libro a una persona dopo averle detto quante pagine ha.
*/
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
