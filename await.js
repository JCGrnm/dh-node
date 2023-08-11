//FUNZIONE DELLA CONSEGNA
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

// Tina, Jorge, Julien; ASYNC AWAIT
const getResults = async () => {
  try {
    for (const player of ["Tina", "Jorge", "Julien"]) {
      const result = await luckyDraw(player);
      console.log(result);
    }
  } catch (error) {
    console.error(error.message);
  }

  console.log("All promises solved/handled");
};

getResults();
