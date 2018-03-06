const log = require('../utils/log');
const run = require('../utils/run');
const watch = require('../utils/watch');
const pkg = require('../../package.json');
const _build = require('./build');

function build() {
  log.green(`building ${pkg.name}...`);
  _build();
}

run(async function () {
  const flags = process.argv.slice(2);

  await build();

  if (flags.includes('--watch')) {
    log.magenta('start watching...');
    watch('./src', build);
  }
});
