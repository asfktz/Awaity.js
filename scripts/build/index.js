const { run, log } = require('../utils');
const watch = require('./watch');
const build = require('./build');

run(async function () {
  const flags = process.argv.slice(2);

  await build();

  if (flags.includes('--watch')) {
    log.magenta('start watching...');
    watch('./src', build);
  }
});
