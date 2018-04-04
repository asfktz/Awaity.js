const inquirer = require('inquirer');
const shell = require('../utils/shell');
const run = require('../utils/run');
const log = require('../utils/log');
const pkg = require('../../package.json');

run(async () => {
  const { version } = await inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'version type',
    choices: [
      { name: 'Patch (0.0.1)', value: 'patch' },
      { name: 'Minor (0.1.0)', value: 'minor' },
      { name: 'Major (1.0.0)', value: 'major' },
    ],
  });

  shell('npm run build');

  log.green('running tests...');
  shell('npm test');

  log.green('bumping version...');
  shell(`npm version ${version}`);

  // FIX ME: Build is called again only to copy the version number /:
  shell('npm run build');

  log.green(`publishing ${pkg.name}...`);
  shell('npm publish', { cwd: `./packages/${pkg.name}` });
});