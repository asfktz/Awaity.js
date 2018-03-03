const util = require('util');
const glob = util.promisify(require('glob'));
const { join, relative } = require('path');
const { emptyDir, write, read } = require('./fs');

const copyPkgConfig = require('./copyPkgConfig');
const transform = require('./transform');
const { createIndexFile, createFPModule } = require('./generate');

const BASE_TARGET = './packages/';
const definitions = [
  ['all', []],
  ['any', []],
  ['props', []],
  ['race', []],
  ['each', ['iterator']],
  ['filter', ['filterer', 'options']],
  ['map', ['mapper', 'options']],
  ['mapSeries', ['mapper']],
  ['reduce', ['reducer', 'initial']],
  ['some', ['total']],
];

async function buildBase(targetPath, envOptions) {
  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**',
  });

  return Promise.all(sources.map(async (srcPath) => {
    const contents = await read(srcPath);
    const path = join(targetPath, relative('./src', srcPath));
    return write(path, transform(contents, envOptions));
  }));
}

async function buildFP(_basePath, envOptions) {
  const baseBase = join(_basePath, 'fp');

  const indexFile = createIndexFile(definitions);
  await write(join(baseBase, 'index.js'), transform(indexFile, envOptions));

  return Promise.all(definitions.map(async ([name, signature]) => {
    const contents = createFPModule(name, signature);
    const transformed = transform(contents, envOptions);

    return write(join(baseBase, `${name}.js`), transformed);
  }));
}

async function build(pkgName, envOptions) {
  console.log('build npm package...', pkgName);

  const basePath = join(BASE_TARGET, pkgName);

  await emptyDir(basePath);
  await copyPkgConfig(basePath, pkgName);

  await Promise.all([
    buildBase(basePath, envOptions),
    buildFP(basePath, envOptions),
  ]);
}

module.exports = async function () {
  await build('littlebird-es', { modules: false });
  await build('littlebird', { modules: 'commonjs' });
};
