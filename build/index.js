const { copy, writeFile, readFile, ensureDir, remove } = require('fs-extra');
const { join, resolve, relative, dirname } = require('path');
const babel = require('babel-core');
const util = require('util');
const glob = util.promisify(require('glob'));

async function run () {
  await remove('./package');

  ['./package.json'].forEach(file => {
    copy(file, join('./package', file));
  });

  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**'
  });

  const transforms = await Promise.all(sources.map(async (origPath) => {
    const contents = await readFile(origPath);
    const path = join('./package', relative('./src', origPath));
    const transformed = babel.transform(contents, {
      presets: [['env', { modules: false }]]
    });;

    await ensureDir(dirname(path));
    return writeFile(path, transformed.code);
  }));

  console.log(transforms) 
}

run().catch(console.error)