const chalk = require('chalk');

function log(...args) {
  console.log(...args);
}

['green', 'magenta'].forEach((color) => {
  log[color] = (...args) => console.log(chalk[color](...args));
});

module.exports = log;
