module.exports = function preparePkgJSON(origConfig, pkgName) {
  const config = { ...origConfig };

  delete config.private;
  delete config.devDependencies;
  delete config.jest;
  delete config.scripts;

  config.name = pkgName;

  return config;
};

