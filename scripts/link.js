const shell = require('./utils/shell');
const log = require('./utils/log');
const { name } = require('../package.json');

function link(pkgName) {
  log.green(`linking ${pkgName}...`);
  shell('npm link', { ctx: `./src/packages/${pkgName}` });
}

link(name);
link(`${name}-es`);
