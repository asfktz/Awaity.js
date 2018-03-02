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

async function copyPkg(srcPath, targetPath) {
  const config = await fs.readJson(srcPath);

  delete config.private;
  delete config.devDependencies;
  delete config.jest;
  delete config.scripts;

  const path = join(targetPath, './package.json');
  return fs.writeJson(path, config, { spaces: '  ' });
}

async function build(targetPath, envOptions) {
  console.log('build npm package...', targetPath, envOptions);

  await fs.emptyDir(targetPath);

  await copyPkg('./package.json', targetPath);

  const sources = await glob('./src/**/*.js', {
    ignore: './src/__tests__/**',
  });

  await transform(sources, targetPath, envOptions);
}

async function run() {
  await build('./packages/littlebird-es', { modules: false });
  await build('./packages/littlebird', { modules: 'commonjs' });
}


run().catch(console.error);
