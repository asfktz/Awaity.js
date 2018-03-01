const { copy, writeFile, readFile, ensureDir, remove } = require('fs-extra');
const { join, resolve, relative, dirname } = require('path');
const babel = require('babel-core');
const util = require('util');
const glob = util.promisify(require('glob'));

async function transform (sources, basePath, envOptions) {
  await Promise.all(sources.map(async (origPath) => {
    const contents = await readFile(origPath);
    const path = join(basePath, relative('./src', origPath));
    const transformed = babel.transform(contents, {
      presets: [['env', envOptions]]
    });;

    await ensureDir(dirname(path));
    return writeFile(path, transformed.code);
  }));
}

async function run () {
  await remove('./package');

  ['./package.json'].forEach(file => {
    copy(file, join('./package', file));
  });

  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**'
  });

  await Promise.all([
    transform(sources, './package', { modules: 'commonjs' }),
    transform(sources, './package/esm', { modules: false })
  ]);
}

run().catch(console.error)