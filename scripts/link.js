const shell = require('./utils/shell');
const log = require('./utils/log');
const pkg = require('../package.json');

log.green(`linking ${pkg.name}...`);
shell('npm link', { ctx: `./src/packages/${pkg.name}` });
