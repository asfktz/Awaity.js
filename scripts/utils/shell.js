const { execSync } = require('child_process');

module.exports = function shell(command, opts) {
  execSync(command, { stdio: 'inherit', ...opts });
};

