const babel = require('babel-core');
const { join, relative, dirname } = require('path');
const { read } = require('./fs');

module.exports = function transform(contents, envOptions) {
  const transformed = babel.transform(contents, {
    presets: [['env', envOptions]],
  });

  return transformed.code;
};

// module.exports = async function transform(sources, basePath, envOptions) {
//   await Promise.all(sources.map(async (origPath) => {
//     const contents = await fs.readFile(origPath);
//     const path = join(basePath, relative('./src', origPath));
//     const transformed = babel.transform(contents, {
//       presets: [['env', envOptions]],
//     });

//     await fs.ensureDir(dirname(path));
//     return fs.writeFile(path, transformed.code);
//   }));
// };
