const { shell, log } = require('./utils');

function link(pkgName) {
  log.green(`linking ${pkgName}...`);
  shell('npm link', { ctx: `./src/packages/${pkgName}` });
}

link('littlebird');
link('littlebird-es');
