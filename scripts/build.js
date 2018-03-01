const babel = require('babel-core');
const util = require('util');
const glob = util.promisify(require('glob'));
const { join, relative, dirname } = require('path');
const fs = require('fs-extra');

async function transform(sources, basePath, envOptions) {
  await Promise.all(sources.map(async (origPath) => {
    const contents = await fs.readFile(origPath);
    const path = join(basePath, relative('./src', origPath));
    const transformed = babel.transform(contents, {
      presets: [['env', envOptions]],
    });

    await fs.ensureDir(dirname(path));
    return fs.writeFile(path, transformed.code);
  }));
}

async function run() {
  console.log('build npm package...');

  await fs.remove('./package');

  ['./package.json'].forEach((file) => {
    fs.copy(file, join('./package', file));
  });

  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**',
  });

  await Promise.all([
    transform(sources, './package', { modules: 'commonjs' }),
    transform(sources, './package/esm', { modules: false }),
  ]);
}

run().catch(console.error);
