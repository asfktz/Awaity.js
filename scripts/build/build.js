const util = require('util');
const glob = util.promisify(require('glob'));
const { join, relative } = require('path');
const { emptyDir, write, writeJson, read, copy } = require('./fs');
const log = require('../utils/log');
const config = require('../../config');
const pkg = require('../../package.json');

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

async function buildFP(basePath, envOptions) {
  const indexFile = createIndexFile(config.definitions);
  await write(join(basePath, 'index.js'), transform(indexFile, envOptions));

  return Promise.all(config.definitions.map(async ([name, argLength]) => {
    const contents = createFPModule(name, argLength);
    const transformed = transform(contents, envOptions);

    return write(join(basePath, `${name}.js`), transformed);
  }));
}

function savePkgJSON(pkg, targetPath, pkgName) {
  const path = join(targetPath, './package.json');
  const config = preparePkgJSON(pkg, pkgName);
  return writeJson(path, config, { spaces: '  ' });
}

async function build(basePath, pkgName, envOptions) {
  await buildBase(basePath, envOptions);
  await buildFP(join(basePath, 'fp'), envOptions);
}

module.exports = async function () {
  const basePath = join(config.baseTarget, `${pkg.name}`);

  await emptyDir(basePath);
  await build(basePath, { modules: 'commonjs' });
  await build(join(basePath, 'esm'), { modules: false });
  await savePkgJSON(pkg, basePath, pkg.name);
  await copy('./README.md', join(basePath, './README.md'));
};
