const { execSync } = require('child_process');
const chalk = require('chalk');

function shell(command, opts) {
  execSync(command, { stdio: 'inherit', ...opts });
}

function run(asyncFn) {
  return asyncFn().catch(console.error);
}

function log(...args) {
  console.log(...args);
}

['green', 'magenta'].forEach((color) => {
  log[color] = (...args) => console.log(chalk[color](...args));
});

module.exports = { run, shell, log };
