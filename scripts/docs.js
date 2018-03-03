const watch = require('./utils/watch');
const log = require('./utils/log');
const shell = require('./utils/shell');
const run = require('./utils/run');

function generateDocs() {
  try {
    shell('node_modules/.bin/jsdoc -c jsdoc.json');
  } catch (err) {
    console.error(err);
  }
}

run(async function () {
  const flags = process.argv.slice(2);

  log.green('generating docs...');
  generateDocs();

  if (flags.includes('--watch')) {
    log.green('watching for docs changes...');
    watch('./src', generateDocs);
  }
});
