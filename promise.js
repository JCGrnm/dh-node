// FUNZIONE DA USARE
function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

//1: APPROCCIO SEQUENZIALE / promise chaining

luckyDraw("Joe")
  .then((result) => {
    console.log(result);
    return luckyDraw("Caroline");
  })
  .then((result) => {
    console.log(result);
    return luckyDraw("Sabrina");
  })
  .catch((error) => {
    console.error("At least 1 promise rejected/has issues", error);
  });

/*
    2) APPROCCIO PARALLELO-CENTRALIZZATO / Promise.all
const players = ["Joe", "Caroline", "Sabrina"];

const promises = players.map((player) => {
  return luckyDraw(player)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error.message);
    });
});

Promise.all(promises)
  .then(() => {
    console.log("All promises solved");
  })
  .catch(() => {
    console.error("At least 1 promise rejected/has issues");
  });

   */
