const util = require('util');
const glob = util.promisify(require('glob'));
const { join, relative } = require('path');
const { emptyDir, write, writeJson, read, copy } = require('./fs');
const log = require('../utils/log');
const config = require('../../config');
const pkgJSON = require('../../package.json');

const preparePkgJSON = require('./preparePkgJSON');
const transform = require('./transform');
const { createIndexFile, createFPModule } = require('./generate');

async function buildBase(basePath, envOptions) {
  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**',
  });

  const indexFile = createIndexFile(config.definitions);
  await write(join(basePath, 'index.js'), transform(indexFile, envOptions));

  return Promise.all(sources.map(async (srcPath) => {
    const contents = await read(srcPath);
    const path = join(basePath, relative('./src', srcPath));
    return write(path, transform(contents, envOptions));
  }));
}

async function buildFP(_basePath, envOptions) {
  const basePath = join(_basePath, 'fp');

  const indexFile = createIndexFile(config.definitions);
  await write(join(basePath, 'index.js'), transform(indexFile, envOptions));

  return Promise.all(config.definitions.map(async ([name, argLength]) => {
    const contents = createFPModule(name, argLength);
    const transformed = transform(contents, envOptions);

    return write(join(basePath, `${name}.js`), transformed);
  }));
}

function savePkgJSON(pkgJSON, targetPath, pkgName) {
  const path = join(targetPath, './package.json');
  const config = preparePkgJSON(pkgJSON, pkgName);
  return writeJson(path, config, { spaces: '  ' });
}

async function build(pkgName, envOptions) {
  log.green(`building ${pkgName}...`);

  const basePath = join(config.baseTarget, pkgName);

  await emptyDir(basePath);

  await Promise.all([
    copy('./README.md', join(basePath, './README.md')),
    savePkgJSON(pkgJSON, basePath, pkgName),
    buildBase(basePath, envOptions),
    buildFP(basePath, envOptions),
  ]);
}

module.exports = async function () {
  const { name } = pkgJSON;
  await build(`${name}-es`, { modules: false });
  await build(`${name}`, { modules: 'commonjs' });
};
