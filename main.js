//esperimento: "Luke, I am your father", in RED, STAR WARS FONT
const figlet = require("figlet");

const text = `
  Luke,
  I am
  your father.
`;

const options = {
  font: "Star Wars",
};

figlet.text(text, options, (err, data) => {
  if (err) {
    console.error("Something went wrong...");
    console.dir(err);
    return;
  }

  const coloredData = `\x1b[31m${data}\x1b[0m`; // Red color

  console.log(coloredData);
});

/* RISPOSTA STANDARD ALLA CONSEGNA
const figlet = require("figlet");

const text = "Hello, Command-Line Art!";

figlet("Earth, do you copy?", (err, data) => {
  if (err) {
    console.error("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
*/
