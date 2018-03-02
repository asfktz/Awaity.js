const { join } = require('path');
const { readJson, writeJson } = require('./fs');

module.exports = async function copyPkg(targetPath, pkgName) {
  const config = await readJson('./package.json');

  delete config.private;
  delete config.devDependencies;
  delete config.jest;
  delete config.scripts;

  config.name = pkgName;

  const path = join(targetPath, './package.json');
  return writeJson(path, config, { spaces: '  ' });
};

