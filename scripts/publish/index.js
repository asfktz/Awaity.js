const inquirer = require('inquirer');
const { shell, log } = require('../utils');

(async () => {
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

  log.green('running tests...');
  shell('npm test');

  log.green('bumping version...');
  shell(`npm version ${version}`);

  shell('npm run build');

  log.green('publishing littlebird...');
  shell('npm publish', { cwd: './packages/littlebird' });

  log.green('publishing littlebird-es...');
  shell('npm publish', { cwd: './packages/littlebird-es' });
})();
