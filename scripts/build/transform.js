const babel = require('babel-core');

module.exports = function transform(contents, envOptions) {
  const transformed = babel.transform(contents, {
    presets: [['env', envOptions]],
  });

  return transformed.code;
};
